// import express
import express from "express";
import ProductController from "./product.controller.js";
// Initialize Product
const ProductRouter = express.Router();

const productController = new ProductController();

// All the path to the product controller methods
// fetch all products
ProductRouter.get('/', productController.getAllProduct);

// add new product
ProductRouter.post('/', productController.addProduct);


export default ProductRouter;
