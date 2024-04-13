
import express from "express";
import CartItemController from "./cartItem.controller.js";

const cartItemRouter = express.Router();

const cartitemcontroller = new CartItemController();

cartItemRouter.post('/', cartitemcontroller.addCart);
cartItemRouter.get('/', cartitemcontroller.getCartItems);
cartItemRouter.delete('/:id',cartitemcontroller.deleteItem);


export default cartItemRouter;