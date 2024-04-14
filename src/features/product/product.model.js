import { ApplicationError } from "../../error-handler/application.error.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  static getAll() {
    return products;
  }
  static productFilter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category === category)
      );
    });
    return result;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static get(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }

  static rateProduct(userID, productID, rating) {
    // validate user and product
    const user = UserModel.getAll().find((u) => u.id == userID);
    if (!user) {
      throw new ApplicationError("user not found",404);
    }
  
    // validate product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new ApplicationError("product not found",400);
    }
  
    // Initialize product ratings if it doesn't exist
    if (!product.ratings) {
      product.ratings = [];
    }
  
    // check if there is any rating if not add rating array.
    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userID == userID
    );
    if (existingRatingIndex >= 0) {
      product.ratings[existingRatingIndex] = {
        userID: userID,
        rating: rating,
      };
    } else {
      // if no existing rating  the add rating
      product.ratings.push({ userID: userID, rating: rating });
    }
  }
  
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Cateogory1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Cateogory2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Cateogory3",
    ["M", "XL", "S"]
  ),
];
