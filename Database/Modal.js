import mongoose from "./config.js";

const Schema = mongoose.Schema({
    username:String,
    useremail:String,
    userpassword:String,
    userotp:Number,
    userverified:Boolean
})

const userModel = new mongoose.model("user",Schema)

export default userModel;