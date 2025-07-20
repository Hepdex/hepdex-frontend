import SignupBox from "../components/SignupBox";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useMutate from "../hooks/useMutate";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Textarea, ValuesBox } from "../components/Form";
import { base64ToBlob, notify } from "../utils/helpers";
import { candidateSignup } from "../services/apiAuth";
import { updateCandidateBio } from "../services/apiCandidate";

const AddBio = () => {
  // Document title
  useDocumentTitle("Add bio");

  // Navigate hook
  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState(false);

  // Candidate signup api
  const [signup] = useMutate(candidateSignup);

  // Update candidate bio
  const [update] = useMutate(updateCandidateBio);

  // Signup data
  const [signupData, setSignupData] = useState(null);

  // Skills state
  const [skills, setSkills] = useState([]);

  // Languages state
  const [languages, setLanguages] = useState([]);

  // Validate form function
  const validateForm = () => {
    // Skills validation
    if (skills.length === 0) {
      notify("Add at least one skill", "error");
      return false;
    }

    // Languages validation
    if (languages.length === 0) {
      notify("Add at least one language", "error");
      return false;
    }
    return true;
  };

  useEffect(() => {
    // Get signup data
    const storedSignupData = sessionStorage.getItem("signupData");

    if (!storedSignupData) {
      // Redirect to signup if signupData doesn't exist
      navigate("/signup");
      return;
    }

    try {
      // Parse signup data
      const parsedSignupData = JSON.parse(storedSignupData);

      if (parsedSignupData.resume) {
        // Convert base64 to blob
        let file = base64ToBlob(parsedSignupData.resume);

        // Create new file
        file = new File([file], "resume.pdf", { type: "application/pdf" });

        // Set file
        parsedSignupData.resume = file;
      }

      // Set signup data
      setSignupData(parsedSignupData);
    } catch (error) {
      // Console log error
      console.error("Error parsing signup data from sessionStorage:", error);

      // Redirect if signup data is corrupted
      navigate("/signup");
    }
  }, [navigate]);

  const handleContinue = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Validate data
    if (!validateForm()) return;

    // Get data
    let data = Object.fromEntries(new FormData(e.target));

    // Add extra fields
    data = {
      ...data,
      acceptTerms: data.acceptTerms === "on",
    };

    if (data.receiveMarketing)
      data.receiveMarketing = data.receiveMarketing === "on";

    const bioData = {
      about: data.about,
      skills,
      languages,
    };

    // Create form data
    const userData = new FormData();

    // Append values
    if (signupData.resume) userData.append("resume", signupData.resume);
    userData.append("country", signupData.country);
    userData.append("email", signupData.email);
    userData.append("firstName", signupData.firstName);
    userData.append("lastName", signupData.lastName);
    userData.append("password", signupData.password);
    userData.append("jobTitle", signupData.jobTitle);
    userData.append("jobType", signupData.jobType);

    try {
      // Set loading state
      setLoading(true);

      // Create user
      const createUserRes = await signup(userData);

      // Check response
      if (createUserRes?.userID) {
        // Get user id
        const userID = createUserRes.userID;
        // Add bio data
        const updateBioRes = await update(bioData, `?userID=${userID}`);

        // Check response
        if (updateBioRes === 200) {
          // Set session storage
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              userID,
              email: signupData.email,
            })
          );

          // Clear signup data
          sessionStorage.removeItem("signupData");

          // Redirect to email confirmation page
          navigate("/confirm-email");
        } else {
          // Error
          notify(updateBioRes, "error");
        }
      } else {
        // Error
        notify(createUserRes, "error");
      }
    } finally {
      setLoading(false);
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
      <SignupBox.Content showTop={false} title="Get started with HepDex">
        <div className="basic-info">
          <div className="box-top">
            <h3>Basic information</h3>
            <p>Tell us about yourself, your skills, and languages you speak.</p>
          </div>
          <Form
            $gap={18}
            onSubmit={handleContinue}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.code === 13) e.preventDefault();
            }}
          >
            <FormGroup
              label={
                <>
                  About <span className="required">*</span>
                </>
              }
              instructions={`Maximum of 260 characters`}
            >
              <Textarea
                placeholder="Tell us about yourself"
                required
                rows={5}
                maxLength={260}
                name="about"
              />
            </FormGroup>
            <ValuesBox
              state={skills}
              setState={setSkills}
              placeholder="Add skill and press Enter"
              label={
                <>
                  Skills <span className="required">*</span>
                </>
              }
              limit={15}
              instructions="Add skills that are relevant to your work or interests."
            />
            <ValuesBox
              state={languages}
              setState={setLanguages}
              placeholder="Add language and press Enter"
              label={
                <>
                  Languages <span className="required">*</span>
                </>
              }
              limit={5}
              instructions="Add languages you can speak or write in."
            />
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
                    {"Terms of Service "}
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
                disabled={loading}
                $loading={loading}
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

export default AddBio;
