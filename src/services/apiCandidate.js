import { apiFetcher } from "../utils/helpers";

// Get candidates
export const getCandidates = apiFetcher("get-candidates", "GET", "data");

// Get candidate
export const getCandidate = apiFetcher("get-candidate", "GET", "data");

// Update candidate bio
export const updateCandidateBio = apiFetcher(
  "update-candidate-bio",
  "PUT",
  "statusCode"
);
