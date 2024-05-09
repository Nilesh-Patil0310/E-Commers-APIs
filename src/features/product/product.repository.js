import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/application.error.js";
import mongoose from "mongoose";
import { productSchema } from "./product.Schema.js";
import { reviewSchema } from "./review.Schema.js";
import { categorySchema } from "./categotySchema.js";


const ProductModel = mongoose.model("product", productSchema);
const ReviewModel = mongoose.model("review", reviewSchema);
const CategoryModel = mongoose.model('category', categorySchema)

class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(productData) {
    try {
      // 1. add the product
      productData.categories = productData.category.map(e=> e.trim());
      console.log(productData);
      const newProduct = await ProductModel(productData);
      const saveProdut = await newProduct.save();

      // 2. update categories
      await CategoryModel.updateMany(
        {_id:{$in:productData.categories}},
        {
          $push:{products: new ObjectId(saveProdut._id)}
        }
      )

      
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      console.log(id);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const products = await collection.find().toArray();
      console.log(products);
      return products;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  // Product should have min price specified and category
  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      categories = JSON.parse(categories.replace(/'/g, '"'));
      if (categories) {
        filterExpression = {
          $and: [{ category: { $in: categories } }, filterExpression],
        };
        // filterExpression.category=category
      }
      return collection
        .find(filterExpression)
        .project({ name: 1, price: 1, _id: 0, ratings: { $slice: 1 } })
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  //   async rate(userID, productID, rating) {
  //     try {
  //       const db = getDB();
  //       const collection = db.collection(this.collection);
  //       // find product
  //       const product = await collection.findOne({
  //         _id: new ObjectId(productID),
  //       });
  //       // check if rating available or not
  //       const userRating = product?.ratings?.find((r) => r.userID == userID);
  //       if (userRating) {
  //         //   update the rating
  //         await collection.updateOne(
  //           {
  //             _id: new ObjectId(productID),
  //             "ratings.userID": new ObjectId(userID),
  //           },
  //           {
  //             $set:{
  //                 "ratings.$.rating":rating
  //             }
  //           }
  //         );
  //       } else {
  //         await collection.updateOne(
  //           {
  //             _id: new ObjectId(productID),
  //           },
  //           {
  //             $push: { ratings: { userID: new ObjectId(userID), rating } },
  //           }
  //         );
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       throw new ApplicationError("Something went wrong with database", 500);
  //     }
  //   }

  async rate(userID, productID, rating) {
    try {
      // 1. check if product exist
      const productToUpdate = await ProductModel.findById(productID);
      if (!productToUpdate) {
        throw new Error("Product not found");
      }
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productID),
        user: new ObjectId(userID),
      });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating:rating
        })
        newReview.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            // get avarage price per category
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}

export default ProductRepository;
