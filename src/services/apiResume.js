import { apiFetcher } from "../utils/helpers";

// Fetch resume
export const getResume = apiFetcher("get-resume", "GET", "data");

// Upload resume
export const uploadResume = apiFetcher(
  "upload-resume",
  "PUT",
  "statusCode",
  false,
  true
);
