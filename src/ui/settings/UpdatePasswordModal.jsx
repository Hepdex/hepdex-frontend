import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import useMutate from "../../hooks/useMutate";
import IconTitle from "../../components/IconTitle";
import Modal, { useModalContext } from "../../components/Modal";
import VerifyOtp, { VerifyButton } from "./VerifyOtp";
import { BsLock } from "react-icons/bs";
import { Form, Password } from "../../components/Form";
import { updatePassword, verifyUpdate } from "../../services/apiUser";
import { notify } from "../../utils/helpers";
import { useState } from "react";

export default function UpdatePasswordModal() {
  // Update password
  const [changePassword, loading] = useMutate(updatePassword);

  // OTP
  const [OTP, setOTP] = useState("");

  // Verify Otp
  const [verify, pending] = useMutate(verifyUpdate);

  // Modal context
  const { close, active, setActive } = useModalContext();

  // Handle update password
  async function handleUpdatePassword(e) {
    // Prevent default submit
    e.preventDefault();

    // Get form data
    const data = Object.fromEntries(new FormData(e.target));

    // Send request
    const response = await changePassword(data);

    // Check response
    if (response === 200) {
      // Switch window
      setActive("verify-password");

      // Success
      notify("Please check your email", "success");
    } else {
      // Error message
      notify(response, "error");
    }
  }

  // Handle verify OTP
  async function handleVerifyOTP(e) {
    // Prevent default submit
    e.preventDefault();

    // Check for OTP
    if (!OTP) return;

    // Send request
    const response = await verify({ otp: OTP });

    // Check response
    if (response === 200) {
      // Close modal
      close();

      // Success
      notify("Password updated successfully", "success");
    } else {
      // Error
      notify(response, "error");
    }
  }

  return (
    <Modal.Window
      name={`${active === "verify-password" ? "verify-password" : "password"}`}
      title={<IconTitle icon={<BsLock size={18} />} title="Change password" />}
      confirm={
        active === "verify-password" ? (
          <VerifyButton loading={pending} />
        ) : (
          <Button
            size="sm"
            form="update-password"
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
      {active === "verify-password" ? (
        <VerifyOtp handleVerifyOTP={handleVerifyOTP} setOTP={setOTP} />
      ) : (
        <Form $gap={18} onSubmit={handleUpdatePassword} id="update-password">
          <Password
            label="Old password"
            placeholder="Old password"
            name="oldPassword"
            required={true}
          />
          <Password
            label="New password"
            placeholder="New password"
            name="newPassword"
            required={true}
          />
        </Form>
      )}
    </Modal.Window>
  );
}
