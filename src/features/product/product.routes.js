// import express
import express from "express";
import ProductController from "./product.controller.js";
import {upload} from '../../middlwares/fileuplod.multer.js'
// Initialize Product
const ProductRouter = express.Router();

const productController = new ProductController();

// All the path to the product controller methods
// fetch all products
ProductRouter.get('/', productController.getAllProduct);

// add new product
ProductRouter.post('/',upload.single('imageUrl'), productController.addProduct);


export default ProductRouter;
