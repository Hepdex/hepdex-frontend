import styled from "styled-components";
import { useEffect, useState } from "react";
import { flex } from "../GlobalStyles";

// Resend OTP
const StyledResendOTP = styled.div`
  ${flex("center")}

  .timer {
    color: var(--color-primary);
  }
  text-align: center;

  .resend-btn {
    color: var(--color-primary);
    background-color: transparent;
  }
`;

const ResendOTP = ({ onResend, seconds = 60, initialSecs = 60 }) => {
  const [counter, setCounter] = useState(initialSecs);

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
          Resend code in
          <span className="timer">
            {` ${String(Math.floor(counter / seconds)).padStart(
              2,
              "0"
            )}:${String(counter % seconds).padStart(2, "0")}`}
          </span>
        </p>
      ) : (
        <p>
          Didn't receive code?{" "}
          <button onClick={handleResend} className="resend-btn">
            Resend
          </button>
        </p>
      )}
    </StyledResendOTP>
  );
};

export default ResendOTP;
