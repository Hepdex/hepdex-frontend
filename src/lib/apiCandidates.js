import { apiFetcher } from "../utils/helpers";

// Get candidates
export const getCandidates = apiFetcher("get-candidates", "GET", "data");
