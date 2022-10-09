import { IUser } from "../interfaces/userDTO";
import User from "../models/user";

class userService {
  async newUser(params: IUser) {
    const store = await User.createUser(params);
    console.log("store", store);
    return store;
  }
}

export default new userService();
