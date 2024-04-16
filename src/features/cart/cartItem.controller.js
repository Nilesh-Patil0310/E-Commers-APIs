import CartItemModel from "./cartItem.model.js";
import CartItemRepository from "./cartItems.repository.js";
export default class CartItemController {
  constructor() {
    this.cartItemRepository = new CartItemRepository();
  }
  async addCart(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID;
      await this.cartItemRepository.addToCart(productID, userID, quantity);
      res.status(201).send("cart is updated");
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async getCartItems(req, res) {
    try {
      const userID = req.userID;

      const items = await this.cartItemRepository.getcartItem(userID);

      return res.status(200).send(items);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }

  async deleteItem(req, res) {
    try {
      const userID = req.userID;
      const cartItemID = req.params.id;
      const isDeleted = await this.cartItemRepository.deleteCartItem(
        userID,
        cartItemID
      );
      console.log(isDeleted);
      if (!isDeleted) {
        return res.status(404).send("Item not found");
      }
      return res.status(200).send("Cart item is removed");
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong");
    }
  }
}
