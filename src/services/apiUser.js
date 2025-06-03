import { apiFetcher } from "../utils/helpers";

// Fetch user
export const fetchUser = apiFetcher("get-user", "GET", "data");

// Update profile
export const updateProfile = (role) =>
  apiFetcher(`update-${role}-profile`, "PUT", "statusCode");

// Update email
export const updateEmail = apiFetcher("update-email", "PUT", "statusCode");

// Verify update
export const verifyUpdate = apiFetcher(
  "verify-update-otp",
  "PUT",
  "statusCode"
);

// Update  password
export const updatePassword = apiFetcher(
  "update-password",
  "PUT",
  "statusCode"
);
