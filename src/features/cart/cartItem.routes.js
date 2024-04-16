
import express from "express";
import CartItemController from "./cartItem.controller.js";

const cartItemRouter = express.Router();

const cartitemcontroller = new CartItemController();

cartItemRouter.post('/', (req,res)=>{
    cartitemcontroller.addCart(req,res)
});
cartItemRouter.get('/', (req,res)=>{
    cartitemcontroller.getCartItems(req,res)
});
cartItemRouter.delete('/:id',(req,res)=>{
    cartitemcontroller.deleteItem(req,res)
});


export default cartItemRouter;