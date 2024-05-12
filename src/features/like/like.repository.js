import mongoose from "mongoose";
import { likeSchema } from "./likes.Schema.js";
import {ApplicationError} from '../../error-handler/application.error.js'
import { ObjectId } from "mongodb";

const LikeModel = mongoose.model("Like", likeSchema);

export class LikeRepository {

  async getLikes(type, id){
    return await LikeModel.find({
        likeable: new ObjectId(id),
        types: type
    }).populate('user').populate({path:'likeable', model: type})
  }
  async likeProduct(userId, productId) {
    try {
        const newLike = new LikeModel({
            user: new ObjectId(userId),
            likeable: new ObjectId(productId),
            types:'Product'
        });
        await newLike.save();

    } catch (err) {
        console.log(err);
        throw new ApplicationError('Something went wrong with database',500)
    }
  }

  async likeCategory(userId, categoryId) {
    try{
        const newLike = new LikeModel({
            user: new ObjectId(userId),
            likeable: new ObjectId(categoryId),
            types:'category'
        });
        await newLike.save();
    }catch(err){
        console.log(err);
        throw new ApplicationError('Something went wrong with database',500)
    }
  }
}
