import Button from "../../components/Button";
import useMutate from "../../hooks/useMutate";
import useSetPageParam from "../../hooks/useSetPageParam";
import Spinner from "../../components/Spinner";
import Modal, { useModalContext } from "../../components/Modal";
import { deleteJob as deleteJobApi } from "../../services/apiJobs";
import { notify } from "../../utils/helpers";
import { useJobsContext } from "../../pages/Jobs";

export default function DeleteJobModal({ jobID, currentDataLength }) {
  // Jobs context
  const { setJobs } = useJobsContext();

  // Modal context
  const { close } = useModalContext();

  // Set page param
  const setPageParam = useSetPageParam(currentDataLength);

  // Delete job
  const [deleteJob, loading] = useMutate(deleteJobApi);

  // Handle delete job
  const handleJobApi = async () => {
    // Send request
    const response = await deleteJob(undefined, `?jobID=${jobID}`);

    // Check response
    if (response === 200) {
      // Update jobs state
      setJobs((data) => {
        // Remove deleted job
        const jobs = data.jobs.filter((job) => job._id !== jobID);

        // Update jobs
        return { jobs };
      });

      // Close modal
      close();

      // Change page param if jobs length is one
      setPageParam();

      // Display message
      notify("Job successfully deleted", "success");
    } else {
      // Display error
      notify(response, "error");
    }
  };

  return (
    <Modal.Window
      name="delete-job"
      alt={true}
      confirm={
        <Button
          size="sm"
          $loading={loading}
          color="error"
          onClick={handleJobApi}
        >
          <span>Delete job</span>
          {loading && <Spinner />}
        </Button>
      }
    >
      <div className="confirm-content">
        <h3 className="heading-sm">Delete this job?</h3>
        <p>
          Are you sure you want to delete this job? This action is permanent and
          cannot be undone.
        </p>
      </div>
    </Modal.Window>
  );
}
