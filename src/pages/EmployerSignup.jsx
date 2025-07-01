import SignupBox from "../components/SignupBox";
import Button from "../components/Button";
import useMutate from "../hooks/useMutate";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Password } from "../components/Form";
import { BsInfoCircle } from "react-icons/bs";
import { checkUniqueEmail } from "../services/apiAuth";
import { notify } from "../utils/helpers";
import { flex } from "../GlobalStyles";

const StyledInfo = styled.div`
  ${flex(undefined, "start")}
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--color-secondary);
  border: 1px solid var(--color-primary);
  gap: 12px;
  margin-bottom: 16px;

  svg {
    min-width: 20px;
    fill: var(--color-primary);
  }

  .info-content {
    h3 {
      font-weight: 500;
    }
    p {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

const EmployerSignup = () => {
  // Errors state
  const [errors, setErrors] = useState({});

  // Check unique email api
  const [check, loading] = useMutate(checkUniqueEmail);

  // Navigate hook
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    // Get input name
    const { name } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form function
  const validateForm = (formData) => {
    // Create errors object
    const newErrors = {};

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Set errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get values
    const formData = Object.fromEntries(new FormData(e.target));

    // Validate data
    if (!validateForm(formData)) return;

    // Check for unique email
    const response = await check({ email: formData.email });

    // Check response
    if (response !== 200) {
      // Error
      notify(response, "error");

      return;
    }

    // Store form data in session storage
    sessionStorage.setItem("signupData", JSON.stringify(formData));

    // Navigate to next step
    navigate("/company/signup");
  };

  return (
    <SignupBox>
      <SignupBox.Left>
        <div>
          <h2>Sign up and step right in.</h2>
          <p>
            Signing up as an employer is quick, free, and easy. One platform to
            handle all your global team’s needs.
          </p>
        </div>
      </SignupBox.Left>
      <SignupBox.Content
        title={
          <>
            Register your company. <br /> Expand your international team.
          </>
        }
        subtitle="Just share a few company details, and you’ll be ready to streamline your global HR using HepDex."
      >
        <StyledInfo>
          <BsInfoCircle size={20} />
          <div className="info-content">
            <h3>This sign up is for companies using HepDex's HR platform</h3>
            <p>
              If you're an employee, be sure to check your inbox! If your
              company manages employment through Hepdex, you'll get an email
              with instructions on how to sign up.
            </p>
          </div>
        </StyledInfo>
        <Form $gap={18} onSubmit={handleSubmit}>
          <FormGroup
            label={
              <>
                First name <span className="required">*</span>
              </>
            }
            instructions="As it appears on your identification"
          >
            <Input
              required
              placeholder="First name"
              type="text"
              name="firstName"
            />
          </FormGroup>
          <FormGroup
            label={
              <>
                Last name <span className="required">*</span>
              </>
            }
            instructions="As it appears on your identification"
          >
            <Input
              required
              placeholder="Last name"
              type="text"
              name="lastName"
            />
          </FormGroup>
          <FormGroup
            label={
              <>
                Company email <span className="required">*</span>
              </>
            }
            instructions="For example 'you@companyname.com'"
          >
            <Input
              required
              placeholder="Company email"
              type="email"
              name="email"
            />
          </FormGroup>
          <Password
            placeholder="Password"
            required
            onChange={handleInputChange}
            name="password"
            label={
              <>
                Password <span className="required">*</span>
              </>
            }
            instructions="Must be at least 8 characters long."
            error={errors.password}
          />
          <div className="submit-box">
            <Button
              style={{ width: "100%" }}
              $loading={loading}
              disabled={loading}
              type="submit"
            >
              <span>Create account</span>
              {loading && <Spinner />}
            </Button>
          </div>
        </Form>
      </SignupBox.Content>
    </SignupBox>
  );
};

export default EmployerSignup;

