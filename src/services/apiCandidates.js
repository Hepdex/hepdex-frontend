import { apiFetcher } from "../utils/helpers";

// Get candidates
export const getCandidates = apiFetcher("get-candidates", "GET", "data");

// Get candidate
export const getCandidate = apiFetcher("get-candidate", "GET", "data");
