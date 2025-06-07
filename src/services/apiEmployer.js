import { apiFetcher } from "../utils/helpers";

// Send requirement
export const sendRequirement = apiFetcher(
  "send-requirements",
  "POST",
  "statusCode"
);
