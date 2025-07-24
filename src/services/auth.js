import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';

import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  payload.password = await bcrypt.hash(payload.password, 10);

  return await User.create(payload);
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'Email or password is incorrect');

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw createHttpError(401, 'Email or password is incorrect');

  await Session.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await Session.create({
    userId: user._id,
    ...newSession,
  });
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');

  if (new Date(session.refreshTokenValidUntil) < new Date())
    throw createHttpError(401, 'Session token expired');

  await Session.deleteOne({ _id: session._id, refreshToken });

  const newSession = createSession();

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logout = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
