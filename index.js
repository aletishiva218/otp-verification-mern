import express from "express";
import dotenv from "dotenv"
import login from "./Routes/User_Routes/login.js";
import register from "./Routes/User_Routes/Register.js";
import registerMiddleware from "./Routes/User_Middlewares/Register_Middleware.js";
import otpMiddleware from "./Routes/User_Middlewares/Otp_Middleware.js";
import loginMiddleware from "./Routes/User_Middlewares/login_Middleware.js";
import otp from "./Routes/User_Routes/Otp.js";
import cors from "cors";

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT;

app.post("/api/login",loginMiddleware.isAllDetails,loginMiddleware.isCorrectFormat,loginMiddleware.isUserExists,login)
app.post("/api/register",registerMiddleware.isAllDetails,registerMiddleware.isCorrectDetails,registerMiddleware.isExists,register)
app.post("/api/register/otp",otpMiddleware.isAllDetails,otpMiddleware.isCorrectFormat,otpMiddleware.isNotExists,otpMiddleware.isCorrectOtp,otp)

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})
