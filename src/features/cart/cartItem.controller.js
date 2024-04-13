import CartItemModel from "./cartItem.model.js";
export default class CartItemController{
    addCart(req,res){
        const {productID, quantity} = req.query;
        const userID = req.userID;
        CartItemModel.add(productID,userID,quantity)
        res.status(201).send('cart is updated')
    }

    getCartItems(req,res){
        const userID = req.userID;

        const items = CartItemModel.get(userID);

        return res.status(200).send(items);
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