import { API_URL, apiFetcher } from "../utils/helpers";

// Fetch resume
export const getResume = apiFetcher("get-resume", "GET", "data");

// Upload resume
export const uploadResume = async (body) => {
  const response = await fetch(`${API_URL}/upload-resume`, {
    method: "PUT",
    body,
    credentials: "include",
  });
  const data = await response.json();
  if (data.statusCode === 200) {
    return data.statusCode;
  } else {
    // Create error
    const error = new Error(data.data.msg);
    // Set status
    error.status = data.statusCode;
    // Throw error
    throw error;
  }
};
