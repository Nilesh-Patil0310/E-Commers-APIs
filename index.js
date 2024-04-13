// 1. import express
import express from "express";
import swagger from "swagger-ui-express";

import bodyParser from "body-parser";
import ProductRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlwares/jwt.middlware.js";
import cartItemRouter from "./src/features/cart/cartItem.routes.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import cors from "cors";
import loggerMiddleware from "./src/middlwares/logger.middleware.js";
// 2. create server
const server = express();

// CORS police configiration
var corsOptions = {
  origin: "http://localhost:5500",
};
server.use(cors());
// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');

//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })
server.use(express.json());
server.use(bodyParser.json());

// swagger api documentation route here
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// logger middleware here
server.use(loggerMiddleware);
// 2.1 for all request related to product are here
server.use("/api/product", jwtAuth, ProductRouter);

// 2.2 for all request related to users
server.use("/api/users", userRouter);

// 2.3 for all request related to cartitems are here
server.use("/api/cartitems", jwtAuth, cartItemRouter);

// 3. Default requiest handeler
server.get("/", (req, res) => {
  res.send("Wellcome to E-commers APIs");
});

// handel the all incorrect APIS here
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not fount Please check the documentation at localhost:3200/api-docs"
    );
});

// 4. Specify port
server.listen(3200, () => {
  console.log("Server is running at:3200");
});
