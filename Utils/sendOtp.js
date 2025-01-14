import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()

const authUser = process.env.AUTH_USER;
const authPass = process.env.AUTH_PASS;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  auth: {
    user:authUser, // Your Gmail email address
    pass: authPass   // Your Gmail email password
  }
});

const sendOtp = (useremail,otp) => {
  const mailOptions = {
    from: authUser, // Your Gmail email address
    to: useremail,
    subject: 'Email Verification Code',
    text: `Your verification code is: ${otp}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
  } else {
      console.log('Email sent:', info.response);
  }
  });
}

export default sendOtp;