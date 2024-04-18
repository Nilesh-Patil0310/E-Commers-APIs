// import express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlwares/fileuplod.multer.js";
// Initialize Product
const ProductRouter = express.Router();

const productController = new ProductController();

// All the path to the product controller methods
// fetch all products

// post rate product
ProductRouter.post("/rate", (req, res, next) => {
  productController.rateProducts(req, res, next);
});

// get fillter products
ProductRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});

ProductRouter.get("/", (req, res) => {
  productController.getAllProduct(req, res);
});

// add new product
ProductRouter.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});

// get fillter products
// ProductRouter.get("/filter", productController.filterProducts);

// to get avarage price of product
ProductRouter.get('/averagePrice', (req,res)=>{
  productController.averagePrice(req,res);
})


// get one product
ProductRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});

export default ProductRouter;
