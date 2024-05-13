import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRespository = new UserRepository();
  }

  async signUp(req, res) {
    try{
    const { name, email, password, type } = req.body;
    const hashPassward = await bcrypt.hash(password, 8);
    const user = new UserModel(name, email, hashPassward, type);
    await this.userRespository.signUp(user);
    res.status(201).send(user);
    }catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async signIn(req, res) {
    try {
      // find user by email
      const user = await this.userRespository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        //  compare passaword with hash password
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // create jwt token
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          //   send token to the client
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }
}
