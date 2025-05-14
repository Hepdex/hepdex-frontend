import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import Modal, { useModalContext } from "../../components/Modal";
import { Form, FormGroup, Input } from "../../components/Form";
import { BsPerson } from "react-icons/bs";
import { useUserContext } from "../../context/UserContext";
import { updateProfile } from "../../lib/apiUser";
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
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    // Update name
    const response = await updateUser(data);
    if (response === 200) {
      // Close modal
      close();
      // Update state
      setUser((user) => ({
        ...user,
        firstName: data.firstName,
        lastName: data.lastName,
      }));
      // Success message
      notify("Name updated successfully", "success");
    } else {
      // Error message
      notify(response, "error");
    }
  }
  return (
    <Modal.Window
      name="name"
      title={
        <>
          <span className="icon">
            <BsPerson />
          </span>
          Change name
        </>
      }
      confirm={
        <Button size="sm" form="update-name" type="submit" $loading={loading}>
          <span>Save new name</span>
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
