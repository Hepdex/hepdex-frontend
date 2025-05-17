import Button from "../components/Button";
import useMutate from "../hooks/useMutate";
import Spinner from "../components/Spinner";
import { BsHouseDoor } from "react-icons/bs";
import { Form, FormGroup, Input } from "../components/Form";
import { useUserContext } from "../context/UserContext";
import { capitalizeFirst, notify } from "../utils/helpers";
import { updateProfile } from "../lib/apiUser";
import { useNavigate } from "react-router-dom";

export default function EditCompany() {
  return (
    <div className="form-box">
      <div className="form-box__content">
        <h3 className="heading-md">Edit company bio</h3>
        <p className="text-md">Update company details.</p>
      </div>
      <EditCompanyForm />
    </div>
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
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    // Update company bio
    const response = await updateCompany(data);
    // Show message
    if (response === 200) {
      // Update user
      setUser((user) => ({ ...user, ...data }));
      notify("Company updated successfully", "success");
      // Navigate to jobs page
      setTimeout(() => {
        navigate("/dashboard/company-bio");
      }, 2000);
    } else {
      notify(response, "error");
    }
  }
  return (
    <Form $gap={32} onSubmit={handleUpdateCompany}>
      <div className="dashboard-box">
        <h3 className="title icon-title">
          <span className="icon">
            <BsHouseDoor size={18} />
          </span>
          Company details
        </h3>
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
            <Input
              placeholder="Company location"
              required
              defaultValue={capitalizeFirst(user.country)}
              name="country"
            />
          </FormGroup>
        </div>
      </div>
      <div>
        <Button type="submit" $loading={loading}>
          <span>Update bio</span>
          {loading && <Spinner />}
        </Button>
      </div>
    </Form>
  );
}
