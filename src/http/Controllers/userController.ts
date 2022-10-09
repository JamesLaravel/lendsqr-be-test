import { validate } from "./../../utils";
import { IUser } from "../../interfaces/userDTO";
import userService from "../../services/userService";
import { userValidation } from "../../validations/userValidation";

export const addNewUser = async (params: IUser) => {
  const value = await validate(params, userValidation);
  const data = await userService.newUser(value);
  return {
    message: "User created successful",
    data,
  };
};
