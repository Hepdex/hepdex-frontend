import Button from "../components/Button";
import useMutate from "../hooks/useMutate";
import Spinner from "../components/Spinner";
import FormBox from "../components/FormBox";
import DashboardBox from "../components/DashboardBox";
import IconTitle from "../components/IconTitle";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { BsHouseDoor } from "react-icons/bs";
import {
  Form,
  FormGroup,
  Input,
  SearchSelect,
  Select,
} from "../components/Form";
import { useUserContext } from "../context/UserContext";
import { notify } from "../utils/helpers";
import { updateProfile } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import { countries } from "../data/countries";

export default function EditCompany() {
  // Document title
  useDocumentTitle("Edit company");
  return (
    <FormBox title="Edit company" subtitle="Update company details.">
      <EditCompanyForm />
    </FormBox>
  );
}

function EditCompanyForm() {
  // User context
  const { user, setUser } = useUserContext();

  // Initial country
  let initialCountry =
    countries.find(
      (country) => country.name.toLowerCase() === user.country.toLowerCase()
    ) ?? {};

  // Navigate hook
  const navigate = useNavigate();

  // Update company
  const [updateCompany, loading] = useMutate(updateProfile(user.role));

  // Handle update company
  async function handleUpdateCompany(e) {
    // Prevent default submit
    e.preventDefault();

    // Get form values
    let data = Object.fromEntries(new FormData(e.target));

    console.log(data);

    // get country
    const [_flag, ...country] = data.country.split(" ");

    data = {
      ...data,
      country: country.join(" "),
    };

    // Send request
    const response = await updateCompany(data);

    // Check response
    if (response === 200) {
      // Update user state
      setUser((user) => ({ ...user, ...data }));

      // Success
      notify("Company bio updated successfully", "success");

      // Navigate to jobs page
      setTimeout(() => {
        navigate("/dashboard/company-bio");
      }, 2000);
    } else {
      // Error
      notify(response, "error");
    }
  }
  return (
    <Form $gap={32} onSubmit={handleUpdateCompany}>
      <DashboardBox
        title={
          <IconTitle
            title="Company details"
            icon={<BsHouseDoor size={18} />}
            className="title"
          />
        }
      >
        <div className="form-content">
          <FormGroup label="Company name">
            <Input
              placeholder="Company name"
              required
              defaultValue={user.companyName}
              name="companyName"
            />
          </FormGroup>
          <FormGroup label="Company location">
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
          <FormGroup label="Company size">
            <Select defaultValue={user.companySize} name="companySize" required>
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="1000+">1000+ employees</option>
            </Select>
          </FormGroup>
        </div>
      </DashboardBox>
      <div>
        <Button type="submit" $loading={loading} disabled={loading}>
          <span>Update bio</span>
          {loading && <Spinner />}
        </Button>
      </div>
    </Form>
  );
}
