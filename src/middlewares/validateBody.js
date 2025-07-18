import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const errors = err.details.map((detail) => detail.message);
      throw createHttpError(400, 'Bad Request', { errors });

      // const error = createHttpError(400, 'Bad Request', {
      //   errors: err.details.map((detail) => detail.message),
      // });
      // next(error); - 2 варіант
    }
  };
};
