import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import IconTitle from "../../components/IconTitle";
import Modal, { useModalContext } from "../../components/Modal";
import { Form, FormGroup, Input } from "../../components/Form";
import { BsPerson } from "react-icons/bs";
import { useUserContext } from "../../context/UserContext";
import { updateProfile } from "../../services/apiUser";
import { notify } from "../../utils/helpers";

export default function UpdateNameModal() {
  // User context
  const { user, setUser } = useUserContext();

  // Modal context
  const { close } = useModalContext();

  // Update profile
  const [updateUser, loading] = useMutate(updateProfile(user.role));

  // Update name
  async function updateName(e) {
    // Prevent default submit
    e.preventDefault();

    // Get form data
    const data = Object.fromEntries(new FormData(e.target));

    // Send request
    const response = await updateUser(data);

    // Check response
    if (response === 200) {
      // Close modal
      close();

      // Update user state
      setUser((user) => ({
        ...user,
        firstName: data.firstName,
        lastName: data.lastName,
      }));

      // Success
      notify("Name updated successfully", "success");
    } else {
      // Error
      notify(response, "error");
    }
  }
  return (
    <Modal.Window
      name="name"
      title={<IconTitle title="Change name" icon={<BsPerson size={18} />} />}
      confirm={
        <Button
          size="sm"
          form="update-name"
          type="submit"
          $loading={loading}
          disabled={loading}
        >
          <span>Update</span>
          {loading && <Spinner />}
        </Button>
      }
    >
      <Form $gap={18} onSubmit={updateName} id="update-name">
        <FormGroup label="First name">
          <Input
            type="text"
            placeholder="First name"
            name="firstName"
            required
          />
        </FormGroup>
        <FormGroup label="Last name">
          <Input placeholder="Last name" type="text" required name="lastName" />
        </FormGroup>
      </Form>
    </Modal.Window>
  );
}
