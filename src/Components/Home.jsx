import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const toSignUp = () => {
    navigate("/register");
  };
  const toSignIn = () => {
    navigate("/login");
  };
  return (
    <div className="home-page">
      <h1>
        Welcome <span className="color-orange">SecureSignIn !</span>
      </h1>
      <p>
        we prioritize your <span className="color-orange">security</span> and{" "}
        <span className="color-orange">privacy</span>.<br />
        <span className="color-orange">Authentication</span> ensures that only
        authorized <span className="color-orange">users</span> can access their
        personal accounts and our exclusive features.By verifying your identity,
        we protect your sensitive information and provide a secure, personalized
        experience. <br /> Authentication helps us maintain the integrity of our
        community and prevent <span className="color-orange">unauthorized</span>{" "}
        access.
      </p>
      <div className="d-flex">
        <Button variant="contained" className="bg-orange" onClick={toSignUp}>
          Sign Up
        </Button>
        <Button variant="contained" className="bg-orange" onClick={toSignIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Home;
