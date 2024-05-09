import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  desc: String,
  inStock: Number,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review"
    }
  ],
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }]
});
