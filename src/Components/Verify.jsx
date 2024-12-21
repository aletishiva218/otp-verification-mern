import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Button from "@mui/material/Button";
import Spinner from "./LoginComponents/Spinner";
import { useNavigate } from "react-router-dom";
import AlertError from "./LoginComponents/AlertError";
const Verify = () => {
  const navigate = useNavigate();
  const [verifyStatus,setVerifyStatus] = useState({})
  const [clicked, setClicked] = useState(false);
  const [userOtp,setUserOtp] = useState()
  useEffect(()=>{
    if(!Cookies.get("useremail"))
      navigate("/register")
  },[navigate])
  const toRegister = () => {
    navigate("/register")
  }
  const onChange = (event) => {
    const {value} = event.target; 
    setUserOtp(value)
    let count = 0;
    for(let c of value)
        count++; 
    setUserOtp(value)
      if(count===4)
        {
          event.target.value="";
          setClicked(true)
        }
      }
      useEffect(()=>{
        const API_URL = "https://otp-verification-mern-fl0a.onrender.com/api/";
    const useremail = Cookies.get("useremail");
        let count=0;
        for(let c of String(userOtp))
          count++;
        if(count===4)
          {
            setVerifyStatus({})
            axios({
              method: "post",
              url: API_URL + "register/otp",
              data: {
                useremail:useremail,
                userotp: userOtp
          }
          })
          .then((response) => {
            setVerifyStatus(response.data);
          })
          .catch((err) => {
            setVerifyStatus(err.response.data);
          });
            setUserOtp(0)
          }

  },[userOtp])
  if (clicked) {
    if (verifyStatus.status === false || verifyStatus.status) {
      if (verifyStatus.status) {
        Cookies.set("token",verifyStatus.token)
        Cookies.remove("useremail")
        navigate("/dashboard");
      }
    }
  }
  return clicked && verifyStatus.status !== false ? (
    <Spinner />
  ) :(
    <div className="app-center">
      <h1 className="no-wrap ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-shield-lock-fill"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5"
          />
        </svg>{" "}
        SecureSignIn
      </h1>
      <AlertError status={verifyStatus.status} message={verifyStatus.message}/>
      <span className="color-orange">Enter OTP</span>
      <form className="otp-form">
        <div className="otp-form-div-first">
          <input type="number" className="otp-input" name="otp" onChange={onChange}/>
          <div className="otp-outer-box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <Button
          variant="contained"
          className="bg-orange margin-top-2 back-register-button"
          type="submit"
          onClick={toRegister}
        >
          Back
        </Button>
      </form>
    </div>
  );
};

export default Verify;
