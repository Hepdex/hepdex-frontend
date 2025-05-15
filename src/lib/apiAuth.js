import { apiFetcher } from "../utils/helpers";

// Check auth status
export const checkAuthStatus = apiFetcher("auth-status", "GET", "data");

export const login = apiFetcher("login", "POST", "data");
