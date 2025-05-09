
import { InputField, FormButton, FormHeader, FormBox } from "../components/FormElements";
import formStyles from "../styles/FormStyles.module.css";
import useDocumentTitle from "../utils/TitleUpdater";


const ForgotPassword = () => {

    useDocumentTitle("Hepdex - Forgot Password");
    
    return <div className={formStyles.formContainer}>
        <FormBox>
             <FormHeader title="Forgot Password?" titleText="Forgot password? Reset your password" />

            <InputField labelValue="Email adddress" placeHolder="Enter your email address" />
        
            
            <FormButton value="Reset Password" />
            
        </FormBox>


        
</div>
}

export default ForgotPassword;
