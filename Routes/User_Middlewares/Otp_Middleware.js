import userModel from "../../Database/Modal.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;

const otpMiddleware = {
    isAllDetails:(req,res,next)=>{
        const {userotp,useremail} = req.body;
        if(!useremail) 
            return res.status(401).json({status:false,message:"useremail is required"})
        if(!userotp)
            return res.status(404).json({status:false,message:"otp is required"})
        next()
    },
    isCorrectFormat:(req,res,next)=>{
        const schema = Joi.object({
            useremail: Joi.string().email({minDomainSegments:1,tlds:{allow:['com']}}),
            userotp: Joi.number()
        })
        const {error} = schema.validate(req.body,{abortEarly:false})
        if(error)
            {
                    const errors = error.details;
                    const displayErrors = [];
                    for(let err of errors){
                        const errorPath = err.path[0];
                        if(errorPath == "useremail") displayErrors.push("invalid email format")
                        if(errorPath == "userotp") displayErrors.push("otp should be number")
                    }
                return res.status(406).json({status:false,errors:displayErrors})
            }
        next()
    },
    isNotExists:async (req,res,next)=>{
        
            const {useremail} = req.body;
            const userAlreadyVerified = await userModel.findOne({useremail:useremail,userverified:true})
            if(userAlreadyVerified)
                return res.status(401).json({status:false,message:"user already verified"})
            const userExists = await userModel.findOne({useremail:useremail})
            if(!userExists)
                return res.status(401).json({status:false,message:"user not exists with given email"})
        next()
    },
    isCorrectOtp:async (req,res,next)=>{
        const {useremail,userotp} = req.body;
        const correctOtp = await userModel.findOne({useremail:useremail,userotp:userotp})
        if(!correctOtp)
            return res.status(401).json({status:false,message:"incorrect otp, submit again"})
        next()
    }

}

export default otpMiddleware;
