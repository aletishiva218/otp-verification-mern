import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import theme from "../Custom/theme.js";
import AlertError from "./LoginComponents/AlertError.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "./LoginComponents/Spinner.jsx";

const Register = () => {
  const [inputUser, setinputUser] = useState({
    username: "",
    useremail: "",
    userpassword: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const [registerStatus, setRegisterStatus] = useState({});
  const [clicked, setClicked] = useState(false);
  const onChange = (event) => {
    const { name, value } = event.target;
    setinputUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
    // console.log(user);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setRegisterStatus({});
    if(inputUser.userpassword!==inputUser.confirmpassword)
        return setRegisterStatus({status:false,message:"password not match"})
      const API_URL = "https://otp-verification-mern-fl0a.onrender.com/api/";
      axios({
        method: "post",
        url: API_URL + "register",
        data: {
          username: inputUser.username,
          useremail: inputUser.useremail,
      userpassword: inputUser.userpassword
    },
    })
    .then((response) => {
      setRegisterStatus(response.data);
    })
    .catch((err) => {
      setRegisterStatus(err.response.data);
    });
    setClicked(true);
  };

  if (clicked) {
    if (registerStatus.status === false || registerStatus.status) {
      if (registerStatus.status) {
        Cookies.set("useremail",inputUser.useremail)
        navigate("/verify");
      }
    }
  }

  return clicked && registerStatus.status !== false ? (
    <Spinner />
  ) : (
    <div className="app-center register-page">
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
      <span className="color-orange">Sign Up</span>
      <AlertError
        message={registerStatus.message}
        status={registerStatus.status}
        errors={registerStatus.errors}
      />
      <form onSubmit={onSubmit}>
        <ThemeProvider theme={theme}>
          <TextField
            id="standard-basic-1"
            label="Username"
            variant="standard"
            color="primary"
            name="username"
            onChange={onChange}
            required
          />
          <TextField
            id="standard-basic-2"
            label="Useremail"
            variant="standard"
            type="email"
            name="useremail"
            onChange={onChange}
            required
          />
          <TextField
            id="standard-password-input-1"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            name="userpassword"
            onChange={onChange}
            required
          />
          <TextField
            id="standard-password-input-2"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            name="confirmpassword"
            onChange={onChange}
            required
          />
        </ThemeProvider>
        <Button
          variant="contained"
          className="bg-orange margin-top-2"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
      <span className="change-form-span">
        Already have an account ?{" "}
        <NavLink className="link-text" to="/login">
          Sign In
        </NavLink>
      </span>
    </div>
  );
};

export default Register;
