import { LikeRepository } from "./like.repository.js";

export class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async likeItem(req, res, next) {
    try {
      const { id, type } = req.body;
      const userId = req.userID;
      if (type != "Products" && type != "category") {
        return res.status(400).send("Invalid Type");
      }
      if (type == "Products") {
        this.likeRepository.likeProduct(userId, id);
      } else {
        this.likeRepository.likeCategory(userId, id);
      }
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }

  async getLikes(req,res,next){
    try{

        const {id, type} = req.query;
        const likes = this.likeRepository.getLikes(type, id);
        return res.status(200).send(likes);
    }catch (err) {
      console.log(err);
      return res.status(200).send("something went wrong");
    }
  }
}
