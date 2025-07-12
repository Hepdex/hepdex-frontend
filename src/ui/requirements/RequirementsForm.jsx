import Button from "../../components/Button";
import Container from "../../components/Container";
import Spinner from "../../components/Spinner";
import useMutate from "../../hooks/useMutate";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  Select,
  Textarea,
} from "../../components/Form";
import { sendRequirement } from "../../services/apiEmployer";
import { notify } from "../../utils/helpers";

export default function RequirementsForm() {
  // Send requirement
  const [send, loading] = useMutate(sendRequirement);

  // Handle send requirement
  const handleSendRequirement = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get values
    const data = Object.fromEntries(new FormData(e.target));

    // Send request
    const response = await send(data);

    // Check response
    if (response === 200) {
      // Success
      notify("Requirement sent successfully", "success");

      // Reset form
      e.target.reset();
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <Container.Col breakPoints={[{ name: "850px", width: 50 }]}>
      <Form $gap={18} onSubmit={handleSendRequirement}>
        <InputGroup>
          <FormGroup label="Full name">
            <Input
              placeholder="Full name"
              name="fullName"
              type="text"
              required
            />
          </FormGroup>
          <FormGroup label="Email address">
            <Input
              placeholder="Email address"
              name="email"
              type="email"
              required
            />
          </FormGroup>
        </InputGroup>
        <InputGroup>
          <FormGroup label="Phone number">
            <Input
              placeholder="Phone number"
              name="phoneNo"
              type="text"
              required
            />
          </FormGroup>
          <FormGroup label="Company name">
            <Input
              placeholder="Company name"
              name="companyName"
              type="text"
              required
            />
          </FormGroup>
        </InputGroup>
        <InputGroup>
          <FormGroup label="Requirement">
            <Select name="requirement" required>
              <option value="">Select requirement</option>
              <option value="HepDex Africa">HepDex Africa</option>
              <option value="Looking for a service">HepDex World</option>
            </Select>
          </FormGroup>
          <FormGroup label="Duration">
            <Select name="serviceDuration" required>
              <option value="">Select duration</option>
              <option value="Less than 1 Month">Less than 1 Month</option>
              <option value="1 to 3 Months">1 to 3 Months</option>
              <option value="3 to 6 Months">3 to 6 Months</option>
              <option value="6 to 12 Months">6 to 12 Months</option>
              <option value="More than 1 Year">More than 1 Year</option>
              <option value="Not sure">Not sure</option>
            </Select>
          </FormGroup>
        </InputGroup>
        <FormGroup label="Requirement details">
          <Textarea
            placeholder="Requirement details"
            rows={5}
            name="details"
            required
          />
        </FormGroup>
        <div className="submit-box">
          <Button type="submit" $loading={loading} disabled={loading}>
            <span>Submit requirements</span>
            {loading && <Spinner />}
          </Button>
        </div>
      </Form>
    </Container.Col>
  );
}
