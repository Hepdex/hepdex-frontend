import Button from "../components/Button";
import useMutate from "../hooks/useMutate";
import Spinner from "../components/Spinner";
import FormBox from "../components/FormBox";
import DashboardBox from "../components/DashboardBox";
import IconTitle from "../components/IconTitle";
import { BsHouseDoor } from "react-icons/bs";
import { Form, FormGroup, Input, Select } from "../components/Form";
import { useUserContext } from "../context/UserContext";
import { notify } from "../utils/helpers";
import { updateProfile } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import { countries } from "../data/countries";

export default function EditCompany() {
  return (
    <FormBox title="Edit company bio" subtitle="Update company details.">
      <EditCompanyForm />
    </FormBox>
  );
}

function EditCompanyForm() {
  // User context
  const { user, setUser } = useUserContext();

  // Navigate hook
  const navigate = useNavigate();

  // Update company
  const [updateCompany, loading] = useMutate(updateProfile(user.role));

  // Handle update company
  async function handleUpdateCompany(e) {
    // Prevent default submit
    e.preventDefault();

    // Get form values
    const data = Object.fromEntries(new FormData(e.target));

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
          <FormGroup label="Company size">
            <Input
              placeholder="Company size"
              required
              defaultValue={user.companySize}
              name="companySize"
            />
          </FormGroup>
          <FormGroup label="Company location">
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
