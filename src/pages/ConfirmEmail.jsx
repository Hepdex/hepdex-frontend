import SignupBox from "../components/SignupBox";
import Button from "../components/Button";
import OTPInput from "../components/OTPInput";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useMutate from "../hooks/useMutate";
import ResendOTP from "../components/ResendOTP";
import Spinner from "../components/Spinner";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mq } from "../GlobalStyles";
import { Form } from "../components/Form";
import { resendOTP } from "../services/apiUser";
import { verifyOTP } from "../services/apiAuth";
import { notify } from "../utils/helpers";

const StyledOTPBox = styled.div`
  background-color: var(--color-white-1);
  border-radius: 8px;
  padding: 40px 24px;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;

  ${mq(
    "400px",
    css`
      padding: 40px 32px;
    `
  )}

  .box-top {
    text-align: center;
    margin-bottom: 16px;

    h3 {
      font-size: 32px;
      line-height: 36px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    p {
      color: var(--color-grey-2);
    }
  }
`;

const ConfirmEmail = () => {
  // Document title
  useDocumentTitle("Confirm email");

  // Navigate hook
  const navigate = useNavigate();

  // OTP state
  const [OTP, setOTP] = useState("");

  // Verify OTP
  const [verify, loading] = useMutate(verifyOTP);

  // Resend OTP
  const [resend] = useMutate(resendOTP);

  // User data state
  const [user, setUser] = useState("");

  // Handle resend OTP
  const handleResendOTP = async () => {
    // Check for user iD
    if (!user.userID) return;

    // Send request
    await resend({ userID: user.userID });
  };

  // Handle verify OTP
  const handleVerifyOTP = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Check for OTP
    if (!OTP || !user.userID) return;

    // Send request
    const response = await verify({ otp: OTP, userID: user.userID });

    // Check response
    if (response === 200) {
      // Success
      notify("Email verification successful", "success");

      // Redirect to login
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } else {
      // Error
      notify(response, "error");
    }
  };

  useEffect(() => {
    // Check for user in sessionStorage
    const storedUser = sessionStorage.getItem("user");

    if (!storedUser) {
      // Redirect to signup if user doesn't exist
      navigate("/signup");
      return;
    }

    try {
      // Parse user object
      const parsedUser = JSON.parse(storedUser);

      // Set user object
      setUser(parsedUser);
    } catch (error) {
      // Error
      console.error("Error parsing user from sessionStorage:", error);

      // Navigate to signup
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <SignupBox>
      <SignupBox.Left showPattern={false}>
        <div>
          <h2>Create your account in a few steps.</h2>
        </div>
        <SignupBox.Steps step={3} email={user?.email} />
      </SignupBox.Left>
      <SignupBox.Content showTop={false}>
        <StyledOTPBox>
          <div className="box-top">
            <h3>Verify OTP</h3>
            <p>Your code was sent to you via email</p>
          </div>
          <Form $gap={12}>
            <OTPInput
              className="box-top--otp"
              onChange={(value) => setOTP(value)}
            />
            <ResendOTP onResend={handleResendOTP} initialSecs={0} />
            <div className="submit-box">
              <Button
                style={{ width: "100%" }}
                onClick={handleVerifyOTP}
                $loading={loading}
                disabled={loading}
              >
                <span>Verify</span>
                {loading && <Spinner />}
              </Button>
            </div>
          </Form>
        </StyledOTPBox>
      </SignupBox.Content>
    </SignupBox>
  );
};

export default ConfirmEmail;
