import { hashPassword } from "./../utils/misc";
import { IUser } from "../interfaces/userDTO";
import Base from "./base";

class User extends Base {
  constructor() {
    super("users");
  }
  public createUser = async (params: IUser) => {
    params.password = await hashPassword(params.password.trim());
    const [id] = await this.create(params);
    return this.findOne({ id }, [
      "first_name",
      "last_name",
      "address",
      "phone",
      "country",
      "state",
      "email",
    ]);
  };

  public findByEmail = async (email: string) => {
    return this.findOne({ email }, []);
  };

  public findById = async (id: number) => {};
}

export default new User();
