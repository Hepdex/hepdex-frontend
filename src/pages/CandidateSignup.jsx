import useMutate from "../hooks/useMutate";
import SignupBox from "../components/SignupBox";
import Button from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "../data/countries";
import {
  Form,
  FormGroup,
  Password,
  Input,
  SearchSelect,
  Select,
} from "../components/Form";
import { checkUniqueEmail } from "../services/apiAuth";
import { notify, removeEmojis } from "../utils/helpers";

const CandidateSignup = () => {
  // Document title
  useDocumentTitle("Sign up as a candidate");

  // Check unique email api
  const [check, loading] = useMutate(checkUniqueEmail);

  // Errors state
  const [errors, setErrors] = useState({});

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

    // Resume validation
    if (formData.resume && formData.resume.type !== "application/pdf") {
      newErrors.resume = "Please select a PDF file";
    }

    // Set errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get data
    const data = Object.fromEntries(new FormData(e.target));

    // Validate data
    if (!validateForm(data)) return;

    // Check for resume file
    if (data.resume) {
      // New file reader
      const reader = new FileReader();

      // Scan file and convert to base 64
      reader.onload = () => {
        const base64 = reader.result;
        data.resume = base64;
      };

      // Start scan
      reader.readAsDataURL(data.resume);
    }

    // Check for unique email
    const response = await check({ email: data.email });

    // Check response
    if (response !== 200) {
      // Error
      notify(response, "error");
      return;
    }

    // Store the data in sessionStorage
    const storageData = {
      ...data,
      country: removeEmojis(data.country),
    };

    // Set session storage
    sessionStorage.setItem("signupData", JSON.stringify(storageData));

    // Navigate to add bio page
    navigate("/add-bio");
  };

  return (
    <SignupBox>
      <SignupBox.Left>
        <div>
          <h2>Join our community today.</h2>
          <p>
            Signing up as a candidate is simple, free, and fast. Discover
            amazing opportunities and connect with top employers.
          </p>
        </div>
      </SignupBox.Left>
      <SignupBox.Content
        title="Sign up for HepDex Hub."
        subtitle="All we need are a few personal details. Then you'll be set up and able to simplify your job search using HepDex."
      >
        <Form $gap={18} onSubmit={handleSubmit}>
          <FormGroup
            label="Resume (PDF)"
            instructions="Optional - Upload your resume as a PDF file."
          >
            <Input type="file" name="resume" onChange={handleInputChange} />
          </FormGroup>
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
                Email <span className="required">*</span>
              </>
            }
            instructions="For example 'you@example.com'"
          >
            <Input required placeholder="Email" type="email" name="email" />
          </FormGroup>
          <FormGroup
            label={
              <>
                Job type <span className="required">*</span>
              </>
            }
            instructions="Choose your preferred job type."
          >
            <Select name="jobType" required>
              <option value="">Select job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </Select>
          </FormGroup>
          <FormGroup
            label={
              <>
                Job title <span className="required">*</span>
              </>
            }
            instructions="Your desired job title or current profession."
          >
            <Input
              required
              placeholder="Job title"
              type="text"
              name="jobTitle"
            />
          </FormGroup>
          <FormGroup
            label={
              <>
                Country <span className="required">*</span>
              </>
            }
            instructions="Your country of residence."
          >
            <SearchSelect
              items={countries.filter((ct) => ct.name !== "Anywhere")}
              name="country"
              placeholder="Select country"
              defaultItem={{}}
              searchPlaceholder="Search countries..."
              required
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
              type="submit"
              $loading={loading}
              disabled={loading}
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

export default CandidateSignup;
