import { UnprocessableEntityError } from "./../errorhandlers/ValidationError";
import Joi from "joi";
import User from "../models/user";

export const userValidation = Joi.object().keys({
  first_name: Joi.string().trim(true).required(),
  last_name: Joi.string().required(),
  email: Joi.string()
    .email()
    .trim(true)
    .external(async (email) => {
      const emailCheck = await User.findByEmail(email);
      if (emailCheck)
        throw new UnprocessableEntityError({
          message: "Email already exist",
        });
    }),
  phone: Joi.string().trim(true).required(),
  country: Joi.string().trim(true).required(),
  state: Joi.string().trim(true).required(),
  address: Joi.string().trim(true).required(),
  password: Joi.string()
    .min(8)
    .trim(true)
    .regex(/[A-Z]/, "upper-case")
    .regex(/[a-z]/, "lower-case")
    .regex(/[\W_]+/, "special character")
    .regex(/[0-9]/, "digits")
    .required(),
});
