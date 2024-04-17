import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProduct(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async addProduct(req, res) {
    try {
      const { name, price, sizes,desc,category } = req.body;
      console.log(name,price,sizes)
      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req.file.filename,
        category,
        sizes.split(",")
      );

      const createProduct = await this.productRepository.add(newProduct);
      res.status(201).send(createProduct);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async rateProducts(req, res, next) {
    console.log(req.query);
    try {
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;

      await this.productRepository.rate(userID, productID, rating);
      return res.status(200).send("Rating has been added");
      
    } catch (err) {
      console.log(err)
      console.log("Passing error to middleware");
      next(err);
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      console.log('******',id);
      const product = await this.productRepository.get(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async filterProducts(req, res) {
    try{  
      const minPrice = req.query.minPrice;
      // const maxPrice = req.query.maxPrice;
      const categories = req.query.categories;
      const result = await this.productRepository.filter(
        minPrice,
        categories
      );
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async averagePrice(req,res,next){
    try{

    }catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }
}
