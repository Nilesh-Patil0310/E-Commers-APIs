import mongoose from "mongoose";
import { userSchema } from "./user.Schema.js";
import { ApplicationError } from "../../error-handler/application.error.js";
// import { use } from "bcrypt/promises.js";

// createting model from Schema

const UserModel = mongoose.model("users", userSchema);

export default class UserRepository {
  async resetPassword(userID, hashedPassword) {
    try {
      let user = await UserModel.findById(userID);
      console.log("User details*******  ",user);
      if (user) {
        user.password = hashedPassword;
        user.save();
      } else {
        throw new Error("No such user found");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async signUp(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async signIn() {
    try {
      return await UserModel.findOne({ email, passwaord });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}
