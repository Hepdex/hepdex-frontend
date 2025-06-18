import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import IconTitle from "../../components/IconTitle";
import Modal, { useModalContext } from "../../components/Modal";
import VerifyOtp, { VerifyButton } from "./VerifyOtp";
import { BsEnvelope } from "react-icons/bs";
import { Form, FormGroup, Input, Password } from "../../components/Form";
import { useUserContext } from "../../context/UserContext";
import { notify } from "../../utils/helpers";
import { updateEmail, verifyUpdate } from "../../services/apiUser";
import { useRef, useState } from "react";

export default function UpdateEmailModal() {
  // Email
  const email = useRef("");

  // OTP
  const [OTP, setOTP] = useState("");

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
    const data = Object.fromEntries(new FormData(e.target));

    // Send request
    const response = await changeEmail(data);

    // Check response
    if (response === 200) {
      // Switch window
      setActive("verify-email");

      // Set email
      email.current = data.email;

      // Success
      notify("Please check your email", "success");
    } else {
      // Error
      notify(response, "error");
    }
  }

  // Handle verify OTP
  async function handleVerifyOTP(e) {
    // Prevent default submit
    e.preventDefault();

    // Check for email and OTP
    if (!OTP || !email.current) return;

    // Send request
    const response = await verify({ otp: OTP, email: email.current });

    // Check response
    if (response === 200) {
      // Close modal
      close();

      // Update user state
      setUser((user) => ({
        ...user,
        email: email.current,
      }));

      // Success
      notify("Email updated successfully", "success");

      // Reset email
      email.current = "";
    } else {
      // Error
      notify(response, "error");
    }
  }

  return (
    <Modal.Window
      name={`${active === "verify-email" ? "verify-email" : "email"}`}
      title={<IconTitle icon={<BsEnvelope size={18} />} title="Change email" />}
      confirm={
        active === "verify-email" ? (
          <VerifyButton loading={pending} />
        ) : (
          <Button
            size="sm"
            form="update-email"
            type="submit"
            $loading={loading}
            disabled={loading}
          >
            <span>Update</span>
            {loading && <Spinner />}
          </Button>
        )
      }
    >
      {active === "verify-email" ? (
        <VerifyOtp setOTP={setOTP} handleVerifyOTP={handleVerifyOTP} />
      ) : (
        <Form $gap={18} id="update-email" onSubmit={handleChangeEmail}>
          <FormGroup label="New email">
            <Input placeholder="New email" type="text" name="email" required />
          </FormGroup>
          <Password
            label="Password"
            placeholder="Password"
            name="password"
            required={true}
          />
        </Form>
      )}
    </Modal.Window>
  );
}
