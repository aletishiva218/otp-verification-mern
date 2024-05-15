import userModel from "../../Database/Modal.js";
import Joi from "joi";

const registerMiddleware = {
    isAllDetails:(req,res,next)=>{
        const {username,useremail,userpassword} = req.body;
        const errors = {};
        if(!username) errors.username="username is required";
        if(!useremail) errors.useremail="useremail is required";
        if(!userpassword) errors.userpassword="userpassword is required";

        if(!(username && useremail && userpassword))
            return res.status(404).json({status:false,message:errors})
        next()
    },
    isCorrectDetails:(req,res,next)=>{
        const schema = Joi.object({
            username: Joi.string().min(3).max(30),
            useremail: Joi.string().email({minDomainSegments:1,tlds:{allow:['com']}}),
            userpassword: Joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/))
        })

        const {error} = schema.validate(req.body,{abortEarly:false})
        if(error)
            {
                    const errors = error.details;
                    const displayErrors = [];
                    for(let err of errors){
                        const errorPath = err.path[0];
                        if(errorPath == "username") displayErrors.push("name must be string,minimum 2 and maximum 100 characters")
                        if(errorPath == "useremail") displayErrors.push("invalid email format")
                        if(errorPath == "userpassword") displayErrors.push("password is required, must include 1 uppercase, 1 lowercase, 1 special symbol, minimum 7 characters")
                    }
                return res.status(406).json({status:false,errors:displayErrors})
            }
        next()
    },
    isExists:async (req,res,next)=>{
        const {useremail} = req.body;
        const userExists = await userModel.findOne({useremail:useremail,userverified:true})
        const userDelete = await userModel.deleteMany({useremail:useremail,userverified:false})
        if(userExists) 
            return res.status(403).json({status:false,message:"user already exists with given email id"})
        next()
    }
}

export default registerMiddleware;
