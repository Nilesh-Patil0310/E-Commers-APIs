import mongoose from "mongoose";

export const categorySchema = mongoose.Schema({
name:String,
produts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
]
})

