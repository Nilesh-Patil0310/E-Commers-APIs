import { getDB } from "../../config/mongodb.js";
import {ObjectId} from 'mongodb';
export default class CartItemRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async addToCart(productID, userID, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne({ productID:new ObjectId(productID), userID:new ObjectId(userID), quantity });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getcartItem(userID){
    try{
    const db = getDB();
    const collection = db.collection(this.collection);
    return await collection.find({userID:new ObjectId(userID)}).toArray();
    }catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
