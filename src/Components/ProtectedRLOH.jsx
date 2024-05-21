import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const ProtectedRLOH = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        const token = Cookies.get("token")
        if(token)
            navigate("/dashboard")
    },[navigate])
    return Component;
}

export default ProtectedRLOH;