// 1. import express
import express from "express";

// 2. create server
const server = express();

// 3. Default requiest handeler
server.get('/', (req,res)=>{
    res.send('Wellcome to E-commers APIs')
})

// 4. Specify port
server.listen(3200,()=>{
    console.log('Server is running at:3200')
});
