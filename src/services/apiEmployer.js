import { apiFetcher } from "../utils/helpers";

// Send requirement
export const sendRequirement = apiFetcher(
  "send-requirements",
  "POST",
  "statusCode"
);


// Upload logo
export const uploadLogo = apiFetcher(
  "upload-logo-image",
  "PUT",
  "data",
  false,
  true
);
