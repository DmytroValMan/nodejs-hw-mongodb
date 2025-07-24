import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    throw createHttpError(401, 'Please provide Authorization header');

  const [bearer, accessToken] = authorization.split(' ', 2);
  if (bearer !== 'Bearer' || !accessToken)
    throw createHttpError(401, 'Auth header should be of type Bearer');

  const session = await Session.findOne({ accessToken });
  if (!session) throw createHttpError(401, 'Session not found');

  if (new Date(session.accessTokenValidUntil) < new Date())
    throw createHttpError(401, 'Session token expired');

  const user = await User.findById(session.userId);
  if (!user) throw createHttpError(401, 'User not found');

  req.user = user;

  next();
};
