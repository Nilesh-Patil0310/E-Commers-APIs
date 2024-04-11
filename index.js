// 1. import express
import express from "express";
import ProductRouter from "./src/features/product/product.routes.js";

// 2. create server
const server = express();

// 2.1 for all request related to product are here
server.use('/api/product', ProductRouter)

// 3. Default requiest handeler
server.get('/', (req,res)=>{
    res.send('Wellcome to E-commers APIs')
})

// 4. Specify port
server.listen(3200,()=>{
    console.log('Server is running at:3200')
});
