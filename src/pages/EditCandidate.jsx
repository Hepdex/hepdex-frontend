import IconTitle from "../components/IconTitle";
import DashboardBox from "../components/DashboardBox";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import FormBox from "../components/FormBox";
import { BsPerson } from "react-icons/bs";
import {
  Form,
  FormGroup,
  Input,
  Select,
  Textarea,
  ValuesBox,
} from "../components/Form";
import { useUserContext } from "../context/UserContext";
import { countries } from "../data/countries";
import { useState } from "react";
import useMutate from "../hooks/useMutate";
import { updateProfile } from "../services/apiUser";
import { notify } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function EditCandidate() {
  // User context
  const { user, setUser } = useUserContext();

  // Skills state
  const [skills, setSkills] = useState(user?.bio?.skills ?? []);

  // Languages state
  const [languages, setLanguages] = useState(user?.bio?.languages ?? []);

  // Update candidate
  const [update, loading] = useMutate(updateProfile(user.role));

  // Navigate hook
  const navigate = useNavigate();

  // Handle update bio
  const handleUpdateBio = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get values
    let data = Object.fromEntries(new FormData(e.target));
    data = {
      ...data,
      bio: {
        about: data.about,
        skills,
        languages,
      },
    };

    // Delete about field
    delete data.about;

    // Send request
    const response = await update(data);

    // Check response
    if (response === 200) {
      // Update user state
      setUser((user) => ({ ...user, ...data }));

      // Success
      notify("Profile updated successfully", "success");

      // Navigate to jobs page
      setTimeout(() => {
        navigate("/dashboard/candidate-bio");
      }, 2000);
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <FormBox title="Edit profile" subtitle="Update profile details.">
      <Form
        $gap={32}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.code === 13) e.preventDefault();
        }}
        onSubmit={handleUpdateBio}
      >
        <DashboardBox
          title={
            <IconTitle
              title="Candidate Profile"
              icon={<BsPerson size={18} />}
              className="title"
            />
          }
        >
          <div className="form-content">
            <FormGroup label="Job title">
              <Input
                placeholder="Job title"
                required
                defaultValue={user.jobTitle}
                name="jobTitle"
              />
            </FormGroup>
            <FormGroup label="Country">
              <Select defaultValue={user.country} name="country">
                <option value="">Select country</option>
                {countries.map((item, index) => (
                  <option
                    key={index}
                    value={item.name.toLowerCase()}
                  >{`${item.flag} ${item.name}`}</option>
                ))}
              </Select>
            </FormGroup>
            <ValuesBox
              state={skills}
              setState={setSkills}
              placeholder="Enter skills"
              label="skills"
            />
            <ValuesBox
              state={languages}
              setState={setLanguages}
              placeholder="Enter languages"
              label="Languages"
            />
            <FormGroup label="About">
              <Textarea
                rows={6}
                name="about"
                defaultValue={user?.bio?.about ?? ""}
                placeholder="Tell us about yourself."
                required
              />
            </FormGroup>
          </div>
        </DashboardBox>
        <div>
          <Button type="submit" disabled={loading} $loading={loading}>
            <span>Update profile</span>
            {loading && <Spinner />}
          </Button>
        </div>
      </Form>
    </FormBox>
  );
}
