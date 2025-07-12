import AuthBox from "../components/AuthBox";
import Button from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useMutate from "../hooks/useMutate";
import OTPInput from "../components/OTPInput";
import Spinner from "../components/Spinner";
import ResendOTP from "../components/ResendOTP";
import { Form, FormGroup, Input, Password } from "../components/Form";
import {
  forgotPassword,
  resendOTP,
  verifyForgotPassword,
} from "../services/apiUser";
import { useRef, useState } from "react";
import { notify } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // Document title
  useDocumentTitle("Forgot password");

  // Navigate hook
  const navigate = useNavigate();

  // User id
  const userID = useRef("");

  // Verify state
  const [isVerify, setIsVerify] = useState(false);

  // OTP state
  const [OTP, setOTP] = useState("");

  // Forgot password
  const [forgot, loading] = useMutate(forgotPassword);

  // Verify forgot password
  const [verify, pending] = useMutate(verifyForgotPassword);

  // Resend OTP
  const [resend] = useMutate(resendOTP);

  // Handle forgot password
  const handleForgotPassword = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get values
    const data = Object.fromEntries(new FormData(e.target));

    // Send request
    const response = await forgot(data);

    // Check response
    if (response?.userID) {
      // Store user ID
      userID.current = response.userID;

      // Success
      notify("Please check your email", "success");

      // Switch form
      setIsVerify(true);
    } else {
      // Error
      notify(response, "error");
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    // Check for user iD
    if (!userID.current) return;

    // Send request
    await resend({ userID: userID.current });
  };

  // Handle verify OTP
  const handleVerifyOTP = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Check for OTP
    if (!OTP || !userID.current) return;

    // Send request
    const response = await verify({ otp: OTP, userID: userID.current });

    // Check response
    if (response === 200) {
      // Success
      notify("Password updated successfully", "success");

      // Redirect to login
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <AuthBox
      title={`${isVerify ? "Verify OTP" : "Forgot password"}`}
      subtitle={`${
        isVerify
          ? "Your code was sent to you via email"
          : "Forgot password? reset your password"
      }`}
    >
      {isVerify ? (
        <Form $gap={12} onSubmit={handleVerifyOTP}>
          <OTPInput onChange={(value) => setOTP(value)} />
          <ResendOTP onResend={handleResendOTP} />
          <div className="submit-box">
            <Button $loading={pending} disabled={pending}>
              <span>Verify</span>
              {pending && <Spinner />}
            </Button>
          </div>
        </Form>
      ) : (
        <Form $gap={18} onSubmit={handleForgotPassword}>
          <FormGroup label="Email address">
            <Input placeholder="Enter email address" required name="email" />
          </FormGroup>
          <Password
            placeholder="Enter new password"
            label="New password"
            name="password"
          />
          <div className="submit-box">
            <Button $loading={loading} disabled={loading}>
              <span>Reset password</span>
              {loading && <Spinner />}
            </Button>
          </div>
        </Form>
      )}
    </AuthBox>
  );
};

export default ForgotPassword;
