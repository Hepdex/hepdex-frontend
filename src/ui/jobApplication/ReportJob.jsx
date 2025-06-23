import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import Modal, { useModalContext } from "../../components/Modal";
import { Form, FormGroup, Select } from "../../components/Form";
import { flagJob } from "../../services/apiJobs";
import { notify } from "../../utils/helpers";

export default function ReportJob({ jobID }) {
  // Flag job api
  const [flag, loading] = useMutate(flagJob);

  // Use modal context
  const { close } = useModalContext();

  // Handle flag job
  const handleFlagJob = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Get values
    let data = Object.fromEntries(new FormData(e.target));

    // Add job ID
    data = {
      ...data,
      jobID,
    };

    // Send request
    const response = await flag(data);

    // Check response
    if (response === 200) {
      // Close modal
      close();

      // Success
      notify("Report sent successfully", "success");
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <Modal.Window
      name="report-job"
      alt
      confirm={
        <Button
          size="sm"
          color="error"
          $loading={loading}
          disabled={loading}
          type="submit"
          form="report-form"
        >
          <span>Report job</span>
          {loading && <Spinner />}
        </Button>
      }
    >
      <div className="modal-box">
        <div className="modal-box--top">
          <h2>Report this job?</h2>
        </div>
        <p className="modal-box--text">
          Reporting jobs helps us maintain the highest quality standards across
          all job postings.
        </p>
        <Form
          className="modal-box--form"
          id="report-form"
          onSubmit={handleFlagJob}
        >
          <FormGroup label="Reason">
            <Select name="reason" required>
              <option value="">Select reason</option>
              <option value="Scam or fraudulent listing">
                Scam or fraudulent listing
              </option>
              <option value="Discriminatory or offensive">
                Discriminatory or offensive
              </option>
              <option value="Incorrect or incomplete information">
                Incorrect or incomplete information
              </option>
              <option value="Other">Other</option>
            </Select>
          </FormGroup>
        </Form>
      </div>
    </Modal.Window>
  );
}
