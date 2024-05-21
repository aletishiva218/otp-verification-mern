import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {  ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Spinner from "./LoginComponents/Spinner.jsx";
import theme from "../Custom/theme.js";
import AlertError from "./LoginComponents/AlertError.jsx";
const Login = () => {
  const [user, setUser] = useState({ useremail: "", userpassword: "" });
  const navigate = useNavigate();
  const [loginStatus, setloginStatus] = useState({});
  const [clicked, setClicked] = useState(false);
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
    // console.log(user);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setloginStatus({})
    const API_URL = "https://otp-verification-server-6rwu.onrender.com/api/";
    axios({ method: "post", url: API_URL + "login", data: user })
      .then((response) => {
        setloginStatus(response.data);
      })
      .catch((err) => {
        setloginStatus(err.response.data);
      });
    setClicked(true);
  };

  if (clicked) {
    if (loginStatus.status === false || loginStatus.status) {
      if (loginStatus.status) {
        console.log("added cookie")
        Cookies.set("token", loginStatus.token);
        navigate("/dashboard");
      }
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 

  return (clicked && loginStatus.status!==false) ? (
    <Spinner />
  ) : (
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
      <span className="color-orange">Login</span>
      <AlertError message={loginStatus.message} status={loginStatus.status} />
      <form onSubmit={onSubmit}>
        <ThemeProvider theme={theme}>
          <TextField
            id="standard-basic"
            label="Useremail"
            variant="standard"
            type="email"
            name="useremail"
            onChange={onChange}
            required
          />
          <FormControl variant="standard" required>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              name="userpassword"
              onChange={onChange}
            />
          </FormControl>
        </ThemeProvider>
        <Button
          variant="contained"
          className="bg-orange margin-top-2"
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <span className="change-form-span">
        Don't have an account ?{" "}
        <NavLink className="link-text" to="/register">
          Sign Up
        </NavLink>
      </span>
    </div>
  );
};

export default Login;