import Joi from "joi";

const urlSchema = Joi.object({
  url: Joi.string().uri().required(),
});

export { urlSchema };
