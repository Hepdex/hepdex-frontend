import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import Modal, { useModalContext } from "../../components/Modal";
import VerifyOtp, { VerifyButton } from "./VerifyOtp";
import { BsEnvelope } from "react-icons/bs";
import { Form, FormGroup, Input } from "../../components/Form";
import { useUserContext } from "../../context/UserContext";
import { notify } from "../../utils/helpers";
import { updateEmail, verifyUpdate } from "../../lib/apiUser";
import { useRef } from "react";

export default function UpdateEmailModal() {
  // Email
  const email = useRef("");
  // User context
  const { setUser } = useUserContext();
  // Update email
  const [changeEmail, loading] = useMutate(updateEmail);
  // Verify Otp
  const [verify, pending] = useMutate(verifyUpdate);
  // Modal context
  const { close, active, setActive } = useModalContext();

  // Handle change email
  async function handleChangeEmail(e) {
    // Prevent default submit
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    // Update email
    const response = await changeEmail(data);
    if (response === 200) {
      // Switch window
      setActive("verify-email");
      // Set email
      email.current = data.email;
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
      // Update state
      setUser((user) => ({
        ...user,
        email: email.current,
      }));
      // Reset email
      email.current = "";
      // Success message
      notify("Email updated successfully", "success");
    } else {
      notify(response, "error");
    }
  }

  return (
    <Modal.Window
      name={`${active === "verify-email" ? "verify-email" : "email"}`}
      title={
        <>
          <span className="icon">
            <BsEnvelope />
          </span>
          Change email
        </>
      }
      confirm={
        active === "verify-email" ? (
          <VerifyButton loading={pending} />
        ) : (
          <Button
            size="sm"
            form="update-email"
            type="submit"
            $loading={loading}
          >
            <span>Save new email</span>
            {loading && <Spinner />}
          </Button>
        )
      }
    >
      {active === "verify-email" ? (
        <VerifyOtp handleVerifyOtp={handleVerifyOtp} />
      ) : (
        <Form $gap={18} id="update-email" onSubmit={handleChangeEmail}>
          <FormGroup label="New email">
            <Input placeholder="New email" type="text" name="email" required />
          </FormGroup>
          <FormGroup label="Password">
            <Input
              placeholder="Password"
              type="password"
              name="password"
              required
            />
          </FormGroup>
        </Form>
      )}
    </Modal.Window>
  );
}
