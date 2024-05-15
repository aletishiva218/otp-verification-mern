import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const accessToken = process.env.ACCESS_TOKEN;

const login = (req,res) => {
    const {useremail,userpassword} = req.body;
    const token = jwt.sign({useremail:useremail,userpassword:userpassword},accessToken)
    res.status(200).json({status:true,token:token,message:"login successfully"})
}

export default login;
