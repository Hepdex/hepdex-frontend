import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { Form, FormGroup, Input } from "../../components/Form";

export default function VerifyOtp({ handleVerifyOtp }) {
  return (
    <Form $gap={18} id="verify-otp" onSubmit={handleVerifyOtp}>
      <FormGroup label="Enter OTP">
        <Input placeholder="Enter OTP" type="text" name="otp" required />
        <Input type="hidden" name="email" id="email-input" />
      </FormGroup>
    </Form>
  );
}

// Verify OTP button
export function VerifyButton({ loading }) {
  return (
    <Button size="sm" form="verify-otp" type="submit" $loading={loading}>
      <span>Verify OTP</span>
      {loading && <Spinner />}
    </Button>
  );
}
