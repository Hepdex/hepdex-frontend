import { useState } from "react";
import formStyles from "../styles/FormStyles.module.css";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { GoEyeClosed, GoEye} from "react-icons/go";

import "../styles/Mainstyles.css";

const FormButton = (props) => {
    return <div className={formStyles.formButton}>
         <button>{props.value}</button>
    </div>
}

const InputField = (props) => {
   
    return <div className={formStyles.inputBox}>
        <label>{props.labelValue}</label>
        <input type={props.type} name={props.name} placeholder={props.placeHolder} />
    </div>
}


const PasswordField = (props) => {
    const [pass, setpass] = useState(true);

    const handleShowPass = () => {
        if(pass){
            setpass(false);
        }
        else {
            setpass(true);
        }
    }
  
    return <div className={formStyles.inputBox}>
        <label>{props.labelValue}</label>
        <input type={pass ? "password" : "text"} name={props.name} placeholder={props.placeHolder} />
        {pass ? <GoEyeClosed className={formStyles.passIcon} onClick={handleShowPass} /> : <GoEye className={formStyles.passIcon} onClick={handleShowPass} />}
    </div>
}

const FormHeader = (props) => {
    return  <div className={formStyles.header}>
            <Logo alt={false} />
            <h1>{props.title}</h1>
            <p>{props.titleText}<Link className={formStyles.forgotLink} to="/signup"> {props.titleLink}</Link></p>
        </div>
}

const FormBox = (props) => {
  return <form className={formStyles.formBox} onSubmit={props.actionHandler}>
      {props.children}
    </form>
};


export {FormButton, InputField, FormHeader, FormBox, PasswordField};