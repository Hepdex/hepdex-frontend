import useMutate from "../hooks/useMutate";
import Preloader from "../components/Preloader";
import AuthBox from "../components/AuthBox";
import Button from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Password } from "../components/Form";
import { useUserContext } from "../context/UserContext";
import { login } from "../services/apiAuth";
import { notify } from "../utils/helpers";

const Signin = () => {
  // Document title
  useDocumentTitle("Login");

  // Navigate hook
  const navigate = useNavigate();

  // User login
  const [userLogin, loading] = useMutate(login);

  // User context
  const { setUser, setIsLoggedIn } = useUserContext();

  // handle user signin form
  const signInHandler = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get values
    const data = Object.fromEntries(new FormData(e.target));

    // Send request
    const response = await userLogin(data);

    // Check response
    if (response?.user) {
      // Set user
      setUser(response.user);

      // Set logged in
      setIsLoggedIn(true);

      // Redirect employer
      if (response.user.role === "employer") navigate("/dashboard/home");

      // Redirect candidate
      if (response.user.role === "candidate") navigate("/dashboard/find-jobs");
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <AuthBox
      title="Welcome back!"
      subtitle={
        <>
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </>
      }
    >
      <Form $gap={18} onSubmit={signInHandler}>
        <FormGroup label="Email address">
          <Input name="email" placeholder="Enter email address" required />
        </FormGroup>
        <Password
          name="password"
          placeholder="Enter password"
          label="Password"
          required
        />
        <Link to="/forgot-password">Forgot password?</Link>
        <div className="submit-box">
          <Button>Login</Button>
        </div>
      </Form>
      {loading ? <Preloader /> : null}
    </AuthBox>
  );
};

export default Signin;
