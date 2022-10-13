const schemaMiddleware = (schema) => {
  return (req, res, next) => {
    const body = req.body;

    const validate = schema.validate(body, { abortEarly: false });

    if (validate.error) {
      const error = validate.error.details.map((detail) => detail.message);
      return res.status(422).send(error);
    }

    res.locals.body = body;
    next();
  };
};

export { schemaMiddleware };
