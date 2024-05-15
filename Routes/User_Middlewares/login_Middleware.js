import userModel from "../../Database/Modal.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const loginMiddleware = {
    isAllDetails:(req,res,next)=>{
        const {useremail,userpassword} = req.body;
        const errors = []
        if(!useremail)
            errors.push("useremail is required");
        if(!userpassword)
            errors.push("userpassword is required")
        if(errors.length)
            return res.status(400).json({status:false,errors:errors})
        next()
    },
    isCorrectFormat:(req,res,next)=>{
        const schema = Joi.object({
            useremail: Joi.string().email({minDomainSegments:1,tlds:{allow:['com']}}),
            userpassword: Joi.required()
        })

        const {error} = schema.validate(req.body,{abortEarly:false})
        if(error)
                return res.status(406).json({status:false,message:"incorrect useremail"})
        next()
    },
    isUserExists:async (req,res,next)=>{
        const {useremail,userpassword} = req.body;
        const userExists = await userModel.findOne({useremail:useremail,userverified:true})
        if(!userExists)
            return res.status(401).json({status:false,message:"user not found"})
        const hashedPassword = userExists.userpassword;
        
        const result = bcrypt.compareSync(userpassword,hashedPassword)
        if(!result)
            return res.status(401).json({status:false,message:"incorrect password"})
        next()
    }
}

export default loginMiddleware;
