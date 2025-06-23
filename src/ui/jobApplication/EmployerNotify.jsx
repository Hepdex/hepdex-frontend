import Button from "../../components/Button";
import Modal, { useModalContext } from "../../components/Modal";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import { useUserContext } from "../../context/UserContext";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/helpers";

export default function EmployerNotify() {
  // User context
  const { setUser, setIsLoggedIn } = useUserContext();

  // Use modal context
  const { close } = useModalContext();

  // Logout api
  const [logout, loading] = useMutate(logoutApi);

  // Navigate hook
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    // Send request
    const response = await logout();

    // Check response
    if (response === 200) {
      // Close modal
      close();

      // Set logged in state
      setIsLoggedIn(false);

      // Clear user state
      setUser(null);

      // Navigate to login
      navigate("/login");
    } else {
      // Display error message
      notify(response, "error");
    }
  };

  return (
    <Modal.Window
      name="employer-notify"
      cancel={false}
      confirm={
        <Button
          size="sm"
          onClick={handleLogout}
          $loading={loading}
          disabled={loading}
        >
          <span>Log out</span>
          {loading && <Spinner />}
        </Button>
      }
      alt
    >
      <div className="modal-box">
        <div className="modal-box--top">
          <h2>You are logged in as an employer</h2>
        </div>
        <p className="modal-box--text">
          Only candidates can apply for jobs. Please log out and sign in with a
          candidate profile to apply for jobs.
        </p>
      </div>
    </Modal.Window>
  );
}
