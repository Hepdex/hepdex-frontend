import { apiFetcher } from "../utils/helpers";

// Check auth status
export const checkAuthStatus = apiFetcher("auth-status", "GET", "data");

// Login
export const login = apiFetcher("login", "POST", "data");

// Logout
export const logout = apiFetcher("logout", "GET", "statusCode");
