import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
export default class CartItemRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async addToCart(productID, userID, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const id = await this.getNextCounter(db);
      await collection.updateOne(
        {
          productID: new ObjectId(productID),
          userID: new ObjectId(userID),
        },
        {
          $setOnInsert: {_id:id},
          $inc: {
            quantity: quantity,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getcartItem(userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userID: new ObjectId(userID) }).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async deleteCartItem(userID, cartItemID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemID),
        userID: new ObjectId(userID),
      });
      console.log(result);
      return result.deletedCount > 0;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getNextCounter(db){

    const resultDocument = await db.collection("counters").findOneAndUpdate(
        {_id:'cartItemId'},
        {$inc:{value: 1}},
        {returnDocument:'after'}
    )  
    console.log(resultDocument);
    return resultDocument.value.value;
}
}
