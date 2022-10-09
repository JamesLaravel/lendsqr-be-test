import { JoiValidationError } from "./../errorhandlers";
import Joi from "joi";

export const validate = async <T>(data: T, schema: Joi.Schema) => {
  const { error, value } = await schema.validateAsync(data);
  if (error) {
    throw new JoiValidationError({
      message: "Error occurred during payload validation",
      verboseMessage: error,
    });
  }

  return value
};
