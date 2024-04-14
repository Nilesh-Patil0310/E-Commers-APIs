import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProduct(req, res) {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createProduct = ProductModel.add(newProduct);
    res.status(201).send(createProduct);
  }

  rateProducts(req, res, next) {
    console.log(req.query);
    try{
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;

    const error = ProductModel.rateProduct(userID, productID, rating);
    console.log(error);
    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(200).send('Rating has been added');
    }
   }catch(err){
     console.log('Passing error to middleware');
     next(err);
   }
  }

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      return res.status(200).send(product);
    }
  }

  filterProducts(req, res) {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const category = req.query.category;
    console.log(req.query);
    const result = ProductModel.productFilter(minPrice, maxPrice, category);
    console.log(result);
    res.status(200).send(result);
  }
}
