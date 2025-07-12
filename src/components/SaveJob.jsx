import Save from "../assets/icons/save.svg?react";
import Saved from "../assets/icons/saved.svg?react";
import useMutate from "../hooks/useMutate";
import { useState } from "react";
import { removeSavedJob, saveJob } from "../services/apiJobs";

export default function SaveJob({
  defaultValue,
  jobID,
  isCandidate,
  isEmployer,
  className = "",
  setSavedJobs,
  isSaved,
}) {
  // Saved state
  const [saved, setSaved] = useState(defaultValue);

  // Save job api
  const [save, saving] = useMutate(saveJob);

  // Remove saved job api
  const [remove, deleting] = useMutate(removeSavedJob);

  // Handle save job
  const handleSaveJob = async (e) => {
    // Stop propagation
    e.stopPropagation();

    // Send request
    const response = await save({ jobID });

    // Check response
    if (response === 200) {
      // Set saved state to true
      setSaved(true);
    } else {
      // Log error
      console.error(response);
    }
  };

  // Handle remove saved job
  const handleRemoveSavedJob = async (e) => {
    // Stop propagation
    e.stopPropagation();

    // Send request
    const response = await remove(undefined, `?jobID=${jobID}`);

    // Check response
    if (response === 200) {
      // Set saved state to false
      if (isSaved) {
        setSavedJobs((prev) => {
          const updatedJobs = prev.savedJobs.filter(
            (job) => job.jobDetails._id !== jobID
          );
          return { savedJobs: updatedJobs };
        });
      } else {
        setSaved(false);
      }
    } else {
      // Log error
      console.error(response);
    }
  };

  return (
    <div className={className}>
      {saved ? (
        <button
          className="save-btn"
          onClick={handleRemoveSavedJob}
          title={`${isCandidate ? "Remove from saved jobs" : ""}`}
          disabled={deleting}
        >
          <Saved />
        </button>
      ) : (
        <button
          className="save-btn"
          title={`${
            isCandidate
              ? "Save job"
              : isEmployer
              ? "Employers cannot save jobs"
              : "Login as a candidate to to save jobs"
          }`}
          disabled={!isCandidate || saving}
          onClick={handleSaveJob}
        >
          <Save />
        </button>
      )}
    </div>
  );
}
