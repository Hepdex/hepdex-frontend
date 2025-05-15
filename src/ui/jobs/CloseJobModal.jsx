import Button from "../../components/Button";
import Modal from "../../components/Modal";

export default function CloseJobModal({ id }) {
  return (
    <Modal.Window
      name="close-job"
      confirm={
        <Button size="sm" color="error">
          Close job
        </Button>
      }
    >
      <div>Close</div>
    </Modal.Window>
  );
}
