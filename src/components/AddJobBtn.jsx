import Button from "./Button";
import Modal from "../components/Modal";
import RoleNotify from "./RoleNotify";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function AddJobBtn({ text = "Post a Job" }) {
  // User context
  const { user, isLoggedIn } = useUserContext();

  return (
    <Modal>
      {user?.role === "candidate" ? (
        <Modal.Open opens="role-notify">
          <Button size="lg">Post a job</Button>
        </Modal.Open>
      ) : (
        <Button
          size="lg"
          as={Link}
          to={`${
            user?.role === "employer" && isLoggedIn
              ? "/post-a-job"
              : "/employer/signup"
          }`}
        >
          {text}
        </Button>
      )}
      <RoleNotify />
    </Modal>
  );
}
