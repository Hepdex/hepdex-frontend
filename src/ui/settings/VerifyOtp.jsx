import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import useMutate from "../../hooks/useMutate";
import OTPInput from "../../components/OTPInput";
import ResendOTP from "../../components/ResendOTP";
import { Form } from "../../components/Form";
import { resendUpdateOTP } from "../../services/apiUser";

export default function VerifyOtp({ handleVerifyOTP, setOTP }) {
  // Resend update OTP
  const [resend] = useMutate(resendUpdateOTP);

  // Handle resend OTP
  const resendOTP = async () => await resend();

  return (
    <Form $gap={18} id="verify-otp" onSubmit={handleVerifyOTP}>
      <h3 className="text-center font-medium">Verify OTP</h3>
      <OTPInput onChange={(value) => setOTP(value)} />
      <ResendOTP onResend={resendOTP} />
    </Form>
  );
}

// Verify OTP button
export function VerifyButton({ loading, ...rest }) {
  return (
    <Button
      size="sm"
      form="verify-otp"
      type="submit"
      $loading={loading}
      disabled={loading}
      {...rest}
    >
      <span>Verify</span>
      {loading && <Spinner />}
    </Button>
  );
}
