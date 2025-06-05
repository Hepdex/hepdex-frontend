import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  Select,
} from "../../components/Form";
import { useUserContext } from "../../context/UserContext";
import { countries } from "../../data/countries";
import { capitalizeFirst, notify } from "../../utils/helpers";
import { applyForJob } from "../../services/apiJobs";
import { useNavigate } from "react-router-dom";

export default function ApplyBox({ jobID }) {
  // User context
  const { user } = useUserContext();
  // Job apply
  const [apply, loading] = useMutate(applyForJob);
  // Navigate hook
  const navigate = useNavigate();

  // Handle application
  async function handleApplication(e) {
    // Prevent default submit
    e.preventDefault();

    // Get values
    const data = Object.fromEntries(new FormData(e.target));

    // Set job ID
    data.jobID = jobID;

    // Send request
    const response = await apply(data);

    // Check response
    if (response === 200) {
      // Success
      notify("Application submitted successfully", "success");

      // Navigate to find jobs page
      setTimeout(() => {
        navigate("/dashboard/find-jobs");
      }, 2000);
    } else {
      // Error
      notify(response, "error");
    }
  }

  return (
    <Container.Col breakPoints={[{ name: "1200px", width: 60 }]}>
      <Card title="Application form">
        <Form $gap={18} onSubmit={handleApplication}>
          <InputGroup>
            <FormGroup label="First name">
              <Input
                placeholder="First name"
                name="firstName"
                required
                defaultValue={capitalizeFirst(user.firstName)}
              />
            </FormGroup>
            <FormGroup label="Last name">
              <Input
                placeholder="Last name"
                name="lastName"
                required
                defaultValue={capitalizeFirst(user.lastName)}
              />
            </FormGroup>
          </InputGroup>
          <InputGroup>
            <FormGroup label="Email address">
              <Input
                placeholder="Email address"
                name="email"
                required
                defaultValue={user.email}
              />
            </FormGroup>
            <FormGroup label="Country">
              <Select
                defaultValue={capitalizeFirst(user.country)}
                required
                name="country"
              >
                <option value="">Select country</option>
                {countries.map((ct, i) => (
                  <option
                    value={ct.name}
                    key={i}
                  >{`${ct.flag} ${ct.name}`}</option>
                ))}
              </Select>
            </FormGroup>
          </InputGroup>
          <FormGroup label="Phone number">
            <Input placeholder="Phone number" name="phoneNo" required />
          </FormGroup>
          <div className="submit-box">
            <Button
              type="submit"
              $loading={loading}
              size="sm"
              disabled={loading}
            >
              <span>Submit application</span>
              {loading && <Spinner />}
            </Button>
          </div>
        </Form>
      </Card>
    </Container.Col>
  );
}
