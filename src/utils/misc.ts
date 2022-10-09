import { InternalServerError } from "../errorhandlers";
import { logger } from "./logger";
import bcrypt from "bcrypt";
export const env = (name: string): string => {
  try {
    const value = process.env[name];
    if (!value) {
      const envErrorMessage = `Missing: process.env['${name}'].`;
      logger.error(envErrorMessage);
      throw new InternalServerError({
        message: envErrorMessage,
        verboseMessage: value,
      });
    }
    return value;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

export const isEmpty = (data: any): boolean => {
  return !data || data === undefined || data === null || data === "";
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};