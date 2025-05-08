import { useEffect } from "react";
import { apiBaseUrl } from "./api";
import { useNavigate } from "react-router-dom";


const useCheckAuthStatus = () => {

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${apiBaseUrl}/auth-status`, {
              method: "GET",
                headers: {
                "Content-Type":"application/json",
                },
                credentials: "include"
        }).then((res) => res.json())
        .then((resp) => {
            if(resp.statusCode === 200 || resp.data.msg === "User authentication is valid"){
                navigate("/dashboard");
            }
        })
    }, [])
};


export default useCheckAuthStatus;