import { apiFetcher } from "../utils/helpers";

// Fetch jobs
export const fetchJobs = apiFetcher("get-jobs", "GET", "data");

// Add job
export const addJob = apiFetcher("add-job", "POST", "statusCode");

// Get job
export const getJob = apiFetcher("get-job", "GET", "data");

// Get job candidate
export const getJobCandidate = apiFetcher("get-job-candidate", "GET", "data");

// Update job
export const updateJob = apiFetcher("update-job", "PUT", "statusCode");

// Delete job
export const deleteJob = apiFetcher("delete-job", "DELETE", "statusCode");

// Update job status
export const updateJobStatus = apiFetcher(
  "update-job-active-status",
  "PUT",
  "statusCode"
);

// Search jobs
export const searchJobs = apiFetcher("search-jobs", "GET", "data");

// Job application
export const applyForJob = apiFetcher("job-application", "POST", "statusCode");

// Flag job
export const flagJob = apiFetcher("flag-job", "POST", "statusCode");

// Save job
export const saveJob = apiFetcher("save-job", "POST", "statusCode");

// Delete saved job
export const removeSavedJob = apiFetcher(
  "delete-saved-job",
  "DELETE",
  "statusCode"
);
