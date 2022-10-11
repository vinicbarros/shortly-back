import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.email().required(),
  password: Joi.string().required(),
});

export { signInSchema };
