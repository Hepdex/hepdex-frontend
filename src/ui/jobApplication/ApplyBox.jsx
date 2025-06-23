import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import Modal, { useModalContext } from "../../components/Modal";
import { Form, FormGroup, Input } from "../../components/Form";
import { useUserContext } from "../../context/UserContext";
import { applyForJob } from "../../services/apiJobs";
import { capitalizeFirst, notify } from "../../utils/helpers";

export default function ApplyBox({ job }) {
  // User context
  const { user } = useUserContext();

  // Modal context
  const { close } = useModalContext();

  // Job apply
  const [apply, loading] = useMutate(applyForJob);

  // Handle application
  async function handleApplication(e) {
    // Prevent default submit
    e.preventDefault();

    // Get values
    let data = Object.fromEntries(new FormData(e.target));

    // Add user details
    data = {
      ...data,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      jobID: job._id,
    };

    // Send request
    const response = await apply(data);

    // Check response
    if (response === 200) {
      // Close modal
      close();

      // Success
      notify(`Application sent to ${job.employer.companyName}`, "success");
    } else {
      // Error
      notify(response, "error");
    }
  }

  return (
    <Modal.Window
      name="apply-box"
      alt
      cancel={false}
      confirm={
        <Button
          size="sm"
          form="apply-form"
          type="submit"
          disabled={loading}
          $loading={loading}
        >
          <span>Submit application</span>
          {loading && <Spinner />}
        </Button>
      }
    >
      <div className="modal-box">
        <div className="modal-box--top">
          <h2 className="heading">Apply to {job.employer.companyName}</h2>
          <p className="modal-box--text">
            {capitalizeFirst(job.jobTitle.toLowerCase())}
          </p>
        </div>

        <Form
          $gap={18}
          onSubmit={handleApplication}
          className="modal-box--form"
          id="apply-form"
        >
          <div>
            <p className="text-center modal-box--text">
              By submitting your application we will send all necessary details
              from your candidate profile to {job.employer.companyName}.
            </p>
          </div>
          <FormGroup label="Email address">
            <Input
              placeholder="Email address"
              name="email"
              type="email"
              required
              defaultValue={user?.email ?? ""}
            />
          </FormGroup>
          <FormGroup label="Phone number">
            <Input
              placeholder="Phone number (with + country code)"
              name="phoneNo"
              required
            />
          </FormGroup>
        </Form>
      </div>
    </Modal.Window>
  );
}
