import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    mobilenumber:Number,
    address:String
})

export const User=mongoose.models.User||mongoose.model('User',UserSchema);