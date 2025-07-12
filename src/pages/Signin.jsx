import useMutate from "../hooks/useMutate";
import AuthBox from "../components/AuthBox";
import Button from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Spinner from "../components/Spinner";
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

      // Employer redirect
      if (response.user.role === "employer") navigate("/dashboard/home");

      // Candidate redirect
      if (response.user.role === "candidate") navigate("/dashboard/find-jobs");

      // Set logged in
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 1000);
    } else if (response?.userId) {
      // Set session storage
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          userID: response.userID,
          email: data.email,
        })
      );

      // Redirect to email confirmation page
      navigate("/confirm-email");
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
          <Button $loading={loading} disabled={loading}>
            <span>Login</span>
            {loading && <Spinner />}
          </Button>
        </div>
      </Form>
    </AuthBox>
  );
};

export default Signin;
