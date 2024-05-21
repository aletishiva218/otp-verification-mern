import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        const token = Cookies.get("token")
        if(!token)
            navigate("/")
    },[navigate])
    return Component;
}

export default Protected;