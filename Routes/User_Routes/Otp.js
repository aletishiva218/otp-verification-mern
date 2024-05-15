import userModel from "../../Database/Modal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()

const accessToken = process.env.ACCESS_TOKEN;

const otp = async (req,res) => {
    const {useremail} = req.body;

    const {userpassword} = await userModel.findOne({useremail:useremail})

    bcrypt.hash(userpassword,10).then(async hashedPassword => {
        await userModel.updateOne({useremail:useremail},{$set:{userpassword:hashedPassword,userverified:true}})
        const token = jwt.sign({useremail:useremail,userpassword:userpassword},accessToken)
        res.status(200).json({status:true,token:token,message:"otp submited successfully, registration successfully"})
    }).catch((error)=>{
        return res.status(400).json({status:false,error:error})
    })
}

export default otp;
