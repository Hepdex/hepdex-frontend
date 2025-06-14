import styled from "styled-components";
import { useEffect, useState } from "react";
import { flex } from "../GlobalStyles";

// Resend OTP
const StyledResendOTP = styled.div`
  ${flex("center")}

  .timer {
    color: var(--color-primary);
  }

  .resend-btn {
    color: var(--color-primary);
    background-color: transparent;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResendOTP = ({ onResend, seconds = 60 }) => {
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    // Return if counter is less than or equal to zero
    if (counter <= 0) return;

    // Reduce counter every second
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [counter]);

  // Handle resend
  const handleResend = () => {
    // Reset timer
    setCounter(seconds);

    // Call resend handler if provided
    onResend?.();
  };

  return (
    <StyledResendOTP>
      {counter > 0 ? (
        <p>
          Resend OTP in
          <span className="timer">
            {` ${String(Math.floor(counter / seconds)).padStart(
              2,
              "0"
            )}:${String(counter % seconds).padStart(2, "0")}`}
          </span>
        </p>
      ) : (
        <button onClick={handleResend} className="resend-btn">
          Resend OTP
        </button>
      )}
    </StyledResendOTP>
  );
};

export default ResendOTP;
