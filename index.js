// 1. import express
import express from "express";
import bodyParser from 'body-parser'
import ProductRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlwares/jwt.middlware.js";
import cartItemRouter from "./src/features/cart/cartItem.routes.js";

// 2. create server
const server = express();
server.use(express.json())
server.use(bodyParser.json());

// 2.1 for all request related to product are here
server.use('/api/product',jwtAuth, ProductRouter)

// 2.2 for all request related to users
server.use('/api/users', userRouter);

// 2.3 for all request related to cartitems are here
server.use('/api/cartitems',jwtAuth, cartItemRouter)

// 3. Default requiest handeler
server.get('/', (req,res)=>{
    res.send('Wellcome to E-commers APIs')
})

// 4. Specify port
server.listen(3200,()=>{
    console.log('Server is running at:3200')
});
