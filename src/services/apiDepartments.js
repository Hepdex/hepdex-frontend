import { apiFetcher } from "../utils/helpers";

// Get departments
export const getDepartments = apiFetcher("get-departments", "GET", "data");
