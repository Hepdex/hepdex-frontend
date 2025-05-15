import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import Modal, { useModalContext } from "../../components/Modal";
import VerifyOtp, { VerifyButton } from "./VerifyOtp";
import { Form, FormGroup, Input } from "../../components/Form";
import { BsLock } from "react-icons/bs";
import { updatePassword, verifyUpdate } from "../../lib/apiUser";
import { notify } from "../../utils/helpers";

export default function UpdatePasswordModal() {
  // Update password
  const [changePassword, loading] = useMutate(updatePassword);
  // Verify Otp
  const [verify, pending] = useMutate(verifyUpdate);
  // Modal context
  const { close, active, setActive } = useModalContext();

  // Handle update password
  async function handleUpdatePassword(e) {
    // Prevent default submit
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    // Change password
    const response = await changePassword(data);
    // Check response
    if (response === 200) {
      // Switch window
      setActive("verify-password");
      // Display message
      notify("OTP sent successfully", "success");
    } else {
      // Error message
      notify(response, "error");
    }
  }

  // Handle verify otp
  async function handleVerifyOtp(e) {
    // Prevent default submit
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    // Verify otp
    const response = await verify(data);
    if (response === 200) {
      // Close modal
      close();
      // Success message
      notify("Password updated successfully", "success");
    } else {
      notify(response, "error");
    }
  }

  return (
    <Modal.Window
      name={`${active === "verify-password" ? "verify-password" : "password"}`}
      title={
        <>
          <span className="icon">
            <BsLock />
          </span>
          Change password
        </>
      }
      confirm={
        active === "verify-password" ? (
          <VerifyButton loading={pending} />
        ) : (
          <Button
            size="sm"
            form="update-password"
            type="submit"
            $loading={loading}
          >
            <span>Save new password</span>
            {loading && <Spinner />}
          </Button>
        )
      }
    >
      {active === "verify-password" ? (
        <VerifyOtp handleVerifyOtp={handleVerifyOtp} />
      ) : (
        <Form $gap={18} onSubmit={handleUpdatePassword} id="update-password">
          <FormGroup label="Old password">
            <Input
              placeholder="Old password"
              type="password"
              name="oldPassword"
              required
            />
          </FormGroup>
          <FormGroup label="New password">
            <Input
              placeholder="New password"
              type="password"
              name="newPassword"
              required
            />
          </FormGroup>
        </Form>
      )}
    </Modal.Window>
  );
}
