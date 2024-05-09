import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { categorySchema } from '../features/product/categotySchema.js';
// import { CategoryModel } from '../features/product/categotySchema.js';
dotenv.config();


const url = process.env.DB_URL;

export const connectUsingMongoose = async()=>{
    
    try{
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected using mongoose');
        addCotegories();
    }catch(err){
        console.log('Error while connecting to db');
        console.log(err);
    }
}

// pou-up some cotegories 

async function addCotegories(){
    const CategoryModel = mongoose.model("Category", categorySchema);
    const categories = await CategoryModel.find();
    if(!categories || categories == 0){
        await CategoryModel.insertMany([{name:'Books'}, {name:'Clothing'},{name:'Electronics'}])
    }
    console.log('Categories are added')
}