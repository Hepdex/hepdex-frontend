import { useEffect } from "react";
import { apiBaseUrl } from "./api";



const useCheckAuthStatus = () => {
    useEffect(() => {
        fetch(`${apiBaseUrl}/auth-status`, {
              method: "GET",
                headers: {
                "Content-Type":"application/json",
                },
                credentials: "include"
        }).then((res) => res.json())
        .then((resp) => {
            console.log(resp);
        })
    }, [])
};


export default useCheckAuthStatus;