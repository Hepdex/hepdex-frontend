import IconTitle from "../components/IconTitle";
import DashboardBox from "../components/DashboardBox";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import FormBox from "../components/FormBox";
import useMutate from "../hooks/useMutate";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { BsPerson } from "react-icons/bs";
import {
  Form,
  FormGroup,
  Input,
  SearchSelect,
  Select,
  Textarea,
  ValuesBox,
} from "../components/Form";
import { useUserContext } from "../context/UserContext";
import { countries } from "../data/countries";
import { useState } from "react";
import { updateProfile } from "../services/apiUser";
import { notify } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function EditCandidate() {
  // Use document title
  useDocumentTitle("Edit profile");

  // User context
  const { user, setUser } = useUserContext();

  // Skills state
  const [skills, setSkills] = useState(user?.bio?.skills ?? []);

  // Languages state
  const [languages, setLanguages] = useState(user?.bio?.languages ?? []);

  // Initial country
  const initialCountry = countries.find(
    (item) => item.name.toLowerCase() === user.country.toLowerCase()
  );

  // Update candidate
  const [update, loading] = useMutate(updateProfile(user.role));

  // Navigate hook
  const navigate = useNavigate();

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

  // Handle update bio
  const handleUpdateBio = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Validate skills and languages
    if (!validateForm()) return;

    // Get values
    let data = Object.fromEntries(new FormData(e.target));

    // Get country
    const [_flag, ...rest] = data.country.split(" ");

    // Construct data
    data = {
      ...data,
      country: rest.join(" ").toLowerCase(),
      available: data.available === "true",
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
        navigate("/dashboard/profile");
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
              title="Profile"
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
            <FormGroup label="Status">
              <Select defaultValue={user.available} name="available">
                <option value="true">Available</option>
                <option value="false">Not available</option>
              </Select>
            </FormGroup>
            <FormGroup label="Location">
              <SearchSelect
                placeholder="Select location"
                searchPlaceholder="Search location..."
                name="country"
                defaultItem={initialCountry}
                items={(() => {
                  return countries.filter((country) => country.code !== "");
                })()}
              />
            </FormGroup>
            <ValuesBox
              state={skills}
              setState={setSkills}
              placeholder="Enter skills"
              label="Skills"
              limit={15}
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
