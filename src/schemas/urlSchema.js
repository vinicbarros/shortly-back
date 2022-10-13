import Joi from "joi";

const urlSchema = Joi.object({
  url: Joi.string()
    .pattern(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    )
    .required(),
});

export { urlSchema };
