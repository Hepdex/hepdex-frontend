import SignupBox from "../components/SignupBox";
import useMutate from "../hooks/useMutate";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeEmojis, notify } from "../utils/helpers";
import {
  Form,
  FormGroup,
  Input,
  SearchSelect,
  Select,
} from "../components/Form";
import { countries } from "../data/countries";
import { employerSignup } from "../services/apiAuth";

const CompanySignup = () => {
  // Navigate hook
  const navigate = useNavigate();

  // Signup data
  const [signupData, setSignupData] = useState(undefined);

  // Employer sign up api
  const [signup, loading] = useMutate(employerSignup);

  useEffect(() => {
    // Check for signupData in sessionStorage
    const storedSignupData = sessionStorage.getItem("signupData");

    if (!storedSignupData) {
      // Redirect to signup page if signupData doesn't exist
      navigate("/signup");
      return;
    }

    try {
      // Parse signupData
      const parsedSignupData = JSON.parse(storedSignupData);

      // Set signupData
      setSignupData(parsedSignupData);
    } catch (error) {
      // Error
      console.error("Error parsing signupData from sessionStorage:", error);

      // Redirect if signupData is corrupted
      navigate("/signup");
    }
  }, [navigate]);

  const handleContinue = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get form data
    let formData = Object.fromEntries(new FormData(e.target));

    // Add extra fields
    formData = {
      ...formData,
      acceptTerms: formData.acceptTerms === "on",
      country: removeEmojis(formData.country),
    };

    if (formData.receiveMarketing)
      formData.receiveMarketing = formData.receiveMarketing === "on";

    // Create updated signup data with company information
    const updatedSignupData = {
      ...signupData,
      companyName: formData.companyName,
      companySize: formData.companySize,
      country: formData.country,
    };

    // Send request
    const response = await signup(updatedSignupData);

    // Check response
    if (response?.userID) {
      // Set session storage
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          userID: response.userID,
          email: updatedSignupData.email,
        })
      );

      // Clear signup data
      sessionStorage.removeItem("signupData");
      // Redirect to email confirmation page
      navigate("/confirm-email");
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <SignupBox>
      <SignupBox.Left showPattern={false}>
        <div>
          <h2>Create your account in a few steps.</h2>
        </div>
        <SignupBox.Steps step={2} email={signupData?.email} />
      </SignupBox.Left>
      <SignupBox.Content title="Get started with HepDex" showTop={false}>
        <div className="basic-info">
          <div className="box-top">
            <h3>Basic information</h3>
            <p>
              This information is required for tax, security, and compliance
              reasons.
            </p>
          </div>
          <Form $gap={18} onSubmit={handleContinue}>
            <FormGroup
              label={
                <>
                  Legal company name <span className="required">*</span>
                </>
              }
              instructions="Make sure this name matches your company's legal documentation."
            >
              <Input
                required
                placeholder="Legal company name"
                name="companyName"
              />
            </FormGroup>
            <FormGroup
              label={
                <>
                  Country <span className="required">*</span>
                </>
              }
              instructions="Where your company is legally based."
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
            <FormGroup
              label={
                <>
                  Company size <span className="required">*</span>
                </>
              }
            >
              <Select name="companySize" defaultValue="" required>
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </Select>
            </FormGroup>
            <div className="accept-box">
              <label htmlFor="acceptTerms">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  required
                />
                <span>
                  I accept the
                  <Link to="/terms-and-conditions" target="_blank">
                    Terms of Service
                  </Link>
                  and I'm authorized to accept for my company
                </span>
              </label>
            </div>
            <div className="accept-box">
              <label htmlFor="receiveMarketing">
                <input
                  type="checkbox"
                  name="receiveMarketing"
                  id="receiveMarketing"
                />
                <span>I agree to receive marketing updates from HepDex</span>
              </label>
            </div>
            <div className="submit-box">
              <Button
                style={{ width: "100%" }}
                $loading={loading}
                disabled={loading}
              >
                <span>Continue</span>
                {loading && <Spinner />}
              </Button>
            </div>
          </Form>
        </div>
      </SignupBox.Content>
    </SignupBox>
  );
};

export default CompanySignup;
