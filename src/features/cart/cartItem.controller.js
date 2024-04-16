import CartItemModel from "./cartItem.model.js";
import CartItemRepository from "./cartItems.repository.js";
export default class CartItemController{
    constructor(){
        this.cartItemRepository = new CartItemRepository();
    }
    async addCart(req,res){
        try{
        const {productID, quantity} = req.body;
        const userID = req.userID;
        await this.cartItemRepository.addToCart(productID,userID,quantity)
        res.status(201).send('cart is updated')
        }catch (err) {
            console.log(err);
            return res.status(400).send("something went wrong");
          }
    }

    async getCartItems(req,res){
        try{
        const userID = req.userID;

        const items = await this.cartItemRepository.getcartItem(userID);

        return res.status(200).send(items);
        }catch (err) {
            console.log(err);
            return res.status(400).send("something went wrong");
          }
    }

    deleteItem(req,res){
        const userID = req.userID;
        const cartItemID = req.params.id;

        const error = CartItemModel.delete(cartItemID,userID);
        console.log(error)

        if(error){
            return res.status(404).send(error)
        }else{
            return res.status(200).send('cart items removed')
        }
    }
}