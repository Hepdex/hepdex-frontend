import { apiFetcher } from "../utils/helpers";

// Send message
export const sendMessage = apiFetcher(
  "post-contact-message",
  "POST",
  "statusCode"
);
