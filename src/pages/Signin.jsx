
import { InputField, FormButton, FormHeader, FormBox } from "../components/FormElements";
import formStyles from "../styles/FormStyles.module.css";
import { Link } from "react-router-dom";


const Signin = () => {
    return <div className={formStyles.formContainer}>
        <FormBox>
             <FormHeader title="Welcome back!" titleText="Don't have an account yet?" titleLink="Sign up" />

            <InputField labelValue="Email adddress" placeHolder="Enter your email address" />
            <InputField labelValue="Password"  placeHolder="Enter your password" type="password" />

            <Link to="/forgot-password" className={formStyles.forgotLink}>Forgot password?</Link>
            
            <FormButton value="Login" />
            
        </FormBox>
</div>
}

export default Signin;
