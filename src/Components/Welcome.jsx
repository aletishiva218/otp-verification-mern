import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    const token = Cookies.get("token");
    if(!token)
      return navigate("/")
    const user = jwtDecode(token);
    setUser(user);
  }, []);
  const logout = () => {
    Cookies.remove("token")
    navigate("/login")
  }
  return (
    <div className="app-center  back-transparent welcome-page">
      <h1>
        Welcome <span className="color-orange">{user.username}</span> !
      </h1>
      <div>
        Your email id is <span className="color-orange">{user.useremail}</span>
      </div>
      <div>
        <Button
          variant="contained"
          className="bg-orange margin-top-2 logout-button"
          type="submit"
          onClick={logout}
        >
          <span>Logout</span><PowerSettingsNewIcon />
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
