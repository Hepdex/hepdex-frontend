import { apiFetcher } from "../utils/helpers";

// Check auth status
export const checkAuthStatus = apiFetcher("auth-status", "GET", "data");

// Check unique email
export const checkUniqueEmail = apiFetcher(
  "check-unique-email",
  "PUT",
  "statusCode"
);

// Verify OTP
export const verifyOTP = apiFetcher("verify-otp", "PUT", "statusCode");

// Employer signup
export const employerSignup = apiFetcher("employer/signup", "POST", "data");

// Candidate signup
export const candidateSignup = apiFetcher(
  "candidate/signup",
  "POST",
  "data",
  false,
  true
);

// Login
export const login = apiFetcher(
  "login",
  "POST",
  "data",
  true,
  false,
  (data) => {
    if (data.statusCode === 401) {
      return data.data;
    }
  }
);

// Logout
export const logout = apiFetcher("logout", "GET", "statusCode");
