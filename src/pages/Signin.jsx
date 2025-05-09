import { useState, useEffect} from "react";
import { InputField, PasswordField, FormButton, FormHeader, FormBox } from "../components/FormElements";
import formStyles from "../styles/FormStyles.module.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toastify } from "../components/Toastify";
import Preloader from "../components/Preloader";
import { apiBaseUrl } from "../utils/Api";
import useDocumentTitle from "../utils/TitleUpdater";
import { useNavigate } from "react-router-dom";
import { getToken, tokenUpdater, userDataUpdater } from "../utils/tokenUpdater";



const Signin = () => {
    useDocumentTitle("Hepdex - Login");
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
   

    useEffect(() => {
        // check if user token exists
        if(getToken("token")){
            navigate("/dashboard")
        }
    }, [])


    // handle user signin form 
    const signInHandler = (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        if(email === "" || !email.includes("@")){
            Toastify("Email address is required");
        }
        else if(password === "" || password.length < 5){
             Toastify("Password is required");
        }
        else {
            setloading(true);

            fetch(`${apiBaseUrl}/login`, {
                method: "POST",
                headers: {
                "Content-Type":"application/json",
                },
                body: JSON.stringify({email: email, password: password}),
                credentials: "include"
            })
            .then((resp) => resp.json())
            .then((resp) => {
                
                setloading(false);

                if(resp.statusCode === 400){
                    Toastify(resp.data.msg);
                }
                else {
                    tokenUpdater(resp.data.token);
                    userDataUpdater(resp.data.user);
                    navigate("/dashboard");
                }
            
              
            })
        }

    }

    return <div className={formStyles.formContainer}>
        <FormBox actionHandler={signInHandler}>
             <FormHeader title="Welcome back!" titleText="Don't have an account yet?" titleLink="Sign up" />

            <InputField labelValue="Email adddress" name="email" placeHolder="Enter your email address" />
            <PasswordField labelValue="Password" name="password" placeHolder="Enter your password" />

            <Link to="/forgot-password" className={formStyles.forgotLink}>Forgot password?</Link>
            
            <FormButton value="Login" />
            
        </FormBox>

        <ToastContainer />
        
        {loading ? <Preloader /> : null}
</div>
}

export default Signin;
