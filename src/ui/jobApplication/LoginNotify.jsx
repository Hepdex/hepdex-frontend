import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function LoginNotify() {
  return (
    <Modal.Window name="login-notify" cancel={false} alt>
      <div className="modal-box">
        <div className="modal-box--top">
          <h2>Sign up or log in to apply</h2>
        </div>
        <p className="modal-box--text">
          To apply for jobs, you need to have a candidate profile. Sign up and
          create yours today!
        </p>
        <div className="modal-box--auth">
          <div>
            <Button size="sm" as={Link} to="/candidate/signup">
              Sign up for free
            </Button>
          </div>
          <p className="modal-box--text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </Modal.Window>
  );
}
