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

// Forgot password
export const forgotPassword = apiFetcher("forgot-password", "PUT", "data");

// Verify forgot password
export const verifyForgotPassword = apiFetcher(
  "verify-forgot-password-otp",
  "PUT",
  "statusCode"
);

// Resend OTP
export const resendOTP = apiFetcher("resend-otp", "PUT", "statusCode");

// Resend update OTP
export const resendUpdateOTP = apiFetcher(
  "resend-update-otp",
  "GET",
  "statusCode"
);

// Upload profile picture
export const uploadProfilePicture = apiFetcher(
  "upload-profile-image",
  "PUT",
  "data",
  false,
  true
);
