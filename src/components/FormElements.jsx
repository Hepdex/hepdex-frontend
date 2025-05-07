import formStyles from "../styles/FormStyles.module.css";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import "../styles/MainStyles.css";

const FormButton = (props) => {
    return <div className={formStyles.formButton}>
         <button>{props.value}</button>
    </div>
}

const InputField = (props) => {
    return <div className={formStyles.inputBox}>
        <label>{props.labelValue}</label>
        <input type={props.type} name={props.name} placeHolder={props.placeHolder} />
    </div>
}

const FormHeader = (props) => {
    return  <div className={formStyles.header}>
            <Logo alt={false} />
            <h1>{props.title}</h1>
            <p>{props.titleText}<Link className={formStyles.forgotLink} to="/signup">{props.titleLink}</Link></p>
        </div>
}

const FormBox = (props) => {
  return <div className={formStyles.formBox}>
      {props.children}
    </div>
};


export {FormButton, InputField, FormHeader, FormBox};