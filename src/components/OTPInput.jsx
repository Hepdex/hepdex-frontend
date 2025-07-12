import styled from "styled-components";
import { useRef, useState } from "react";
import { flex } from "../GlobalStyles";

// OTP box styles
const StyledOTP = styled.div`
  ${flex("center", "center")}
  gap: 16px;
  flex-wrap: wrap;

  .input-box {
    ${flex("center", "center")}
    width: 48px;
    border: 1px solid var(--color-grey-3);
    padding: 0 12px;
    border-radius: 8px;
    height: 48px;
  }

  input {
    text-align: center;
    width: 100%;
  }
`;

const OTPInput = ({ length = 6, onChange, className = "" }) => {
  // Inital values
  const [otp, setOtp] = useState(Array(length).fill(""));

  // Input refs
  const inputs = useRef([]);

  // Handle OTP change
  const handleChange = (element, index) => {
    // Check if values are numbers
    const value = element.value.replace(/[^0-9]/g, "");

    // Return if theres no value
    if (!value) return;

    // Get old OTP
    const newOtp = [...otp];

    // Set value
    newOtp[index] = value[0];

    // Set OTP
    setOtp(newOtp);

    // Call onChange function
    onChange?.(newOtp.join(""));

    // Move focus to next input
    if (index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle key press
  const handleKeyDown = (e, index) => {
    // Check for backspace key
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      // Check for value
      if (otp[index]) {
        // Clear value
        newOtp[index] = "";

        // Set OTP
        setOtp(newOtp);

        // Call onChange
        onChange?.(newOtp.join(""));
      } else if (index > 0) {
        // Go to previous box
        inputs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Go to previous box
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      // Go to next box
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e) => {
    // Prevent default paste
    e.preventDefault();

    // Make sure values are numbers and length is not more than defined length
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);

    // Get old OTP
    const newOtp = [...otp];

    // Set new values
    for (let i = 0; i < length; i++) {
      newOtp[i] = pasted[i] || "";
    }

    // Set new OTP
    setOtp(newOtp);

    // Call onChange function
    onChange?.(newOtp.join(""));

    // Focus last input
    inputs.current[Math.min(pasted.length - 1, length - 1)]?.focus();
  };

  return (
    <StyledOTP className={className}>
      {otp.map((digit, index) => (
        <div className="input-box" key={index}>
          <input
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputs.current[index] = el)}
          />
        </div>
      ))}
    </StyledOTP>
  );
};

export default OTPInput;
