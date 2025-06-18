import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import Spinner from "../../components/Spinner";
import useSetPageParam from "../../hooks/useSetPageParam";
import Modal, { useModalContext } from "../../components/Modal";
import { updateJobStatus } from "../../services/apiJobs";
import { notify } from "../../utils/helpers";
import { useJobsContext } from "../../pages/Jobs";

export default function CloseJobModal({ jobID, currentDataLength }) {
  // Jobs context
  const { setJobs } = useJobsContext();

  // Modal context
  const { close } = useModalContext();

  // Set page param
  const setPageParam = useSetPageParam(currentDataLength);

  // Close job
  const [closeJob, loading] = useMutate(updateJobStatus);

  // Handle close job
  async function handleCloseJob() {
    // Send request
    const response = await closeJob({
      jobID,
      active: false,
    });

    // Check response
    if (response === 200) {
      // Update jobs state
      setJobs((data) => {
        const jobs = data.jobs;

        // Find job
        const updatedJob = jobs.find((job) => job._id === jobID);

        // Check if job exists
        if (!updatedJob) return data;

        // Set status
        updatedJob.active = false;
        // Update jobs
        return {
          jobs,
        };
      });

      // Close modal
      close();

      // Change page param if jobs length is one
      setPageParam();

      // Display message
      notify("Job successfully closed", "success");
    } else {
      // Display error
      notify(response, "error");
    }
  }

  return (
    <Modal.Window
      name="close-job"
      alt={true}
      confirm={
        <Button
          size="sm"
          color="error"
          $loading={loading}
          onClick={handleCloseJob}
        >
          <span>Close job</span>
          {loading && <Spinner />}
        </Button>
      }
    >
      <div className="confirm-content">
        <h3 className="heading-sm">Close this job?</h3>
        <p>
          This job will be removed from your open jobs. You can re-open it later
          if you need to hire for this role again.
        </p>
      </div>
    </Modal.Window>
  );
}
