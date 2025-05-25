import useMutate from "../hooks/useMutate";
import Preloader from "../components/Preloader";
import useDocumentTitle from "../utils/TitleUpdater";
import formStyles from "../styles/FormStyles.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FormBox,
  FormButton,
  FormHeader,
  InputField,
  PasswordField,
} from "../components/FormElements";
import { Toastify } from "../components/Toastify";
import { useUserContext } from "../context/UserContext";
import { login } from "../lib/apiAuth";

const Signin = () => {
  useDocumentTitle("Hepdex - Login");
  const navigate = useNavigate();
  const [userLogin, loading] = useMutate(login);
  const { setUser, setIsLoggedIn } = useUserContext();

  // handle user signin form
  const signInHandler = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    if (email === "" || !email.includes("@")) {
      Toastify("Email address is required");
    } else if (password === "" || password.length < 5) {
      Toastify("Password is required");
    } else {
      const data = {
        email,
        password,
      };

      const response = await userLogin(data);
      if (response?.user) {
        setUser(response.user);
        setIsLoggedIn(true);
        // Redirect employer
        if (response.user.role === "employer") navigate("/dashboard/home");
        // Redirect candidate
        if (response.user.role === "candidate")
          navigate("/dashboard/browse-jobs");
      } else {
        Toastify(response);
      }
    }
  };

  return (
    <div className={formStyles.formContainer}>
      <FormBox actionHandler={signInHandler}>
        <FormHeader
          title="Welcome back!"
          titleText="Don't have an account yet?"
          titleLink="Sign up"
        />

        <InputField
          labelValue="Email adddress"
          name="email"
          placeHolder="Enter your email address"
        />
        <PasswordField
          labelValue="Password"
          name="password"
          placeHolder="Enter your password"
        />

        <Link to="/forgot-password" className={formStyles.forgotLink}>
          Forgot password?
        </Link>

        <FormButton value="Login" />
      </FormBox>
      {loading ? <Preloader /> : null}
    </div>
  );
};

export default Signin;
