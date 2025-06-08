import AuthBox from "../components/AuthBox";
import Button from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Form, FormGroup, Input } from "../components/Form";

const ForgotPassword = () => {
  useDocumentTitle("Forgot Password");

  return (
    <AuthBox
      title="Forgot password"
      subtitle="Forgot password? reset your password"
    >
      <Form $gap={18}>
        <FormGroup label="Email address">
          <Input placeholder="Enter email address" required />
        </FormGroup>
        <div className="submit-box">
          <Button>Reset password</Button>
        </div>
      </Form>
    </AuthBox>
  );
};

export default ForgotPassword;
