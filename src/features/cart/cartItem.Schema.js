import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  quantity: Number,
});
