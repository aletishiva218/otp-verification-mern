import sendOtp from "../../Utils/sendOtp.js";
import userModel from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const accessToken = process.env.ACCESS_TOKEN;

const register =async (req,res) => {
    const {useremail,userpassword,username} = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    sendOtp(useremail,otp);
        const userDetails = {username:username,useremail:useremail,userpassword:userpassword,userotp:otp,userverified:false};
        await userModel.create(userDetails)
        res.status(200).json({status:true,message:"otp sent in your email, submit to register"})
    
}

export default register;
