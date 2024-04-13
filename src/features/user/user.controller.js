import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.signUp(name, email, password, type);
    res.status(201).send(user);
  }

  signIn(req, res) {
    const result = UserModel.signIn(req.body.email, req.body.password);
    if (!result) {
      return res.status(400).send("Incorrect Credentials");
    } else {
      // create jwt token
      const token = jwt.sign(
        {
          userID: result.id,
          email: result.email,
        },
        "IPO2fWYvk70Y3G2ZJc01ICXcWIQeSw21",
        {
          expiresIn: "1h",
        }
      );
    //   send token to the client
      return res.status(200).send(token);
    }
  }
}
