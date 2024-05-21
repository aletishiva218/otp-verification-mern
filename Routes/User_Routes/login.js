import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../../Database/Modal.js";
dotenv.config()

const accessToken = process.env.ACCESS_TOKEN;

const login = async (req,res) => {
    const {useremail,userpassword} = req.body;
    const user = await userModel.findOne({useremail:useremail})
    user.userpassword=userpassword;
    const token = jwt.sign({username:user.username,useremail:user.useremail,userpassword:userpassword},accessToken)
    res.status(200).json({status:true,token:token,message:"login successfully"})
}

export default login;
