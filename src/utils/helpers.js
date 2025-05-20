import ct from "countries-and-timezones";
import Toast from "../components/Toast";
import { toast } from "react-toastify";

export const API_URL = import.meta.env.VITE_API_URL;

// API fetcher
export const apiFetcher =
  (route, method, field) =>
  async (body = undefined, query = undefined) => {
    // Default options
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    // Method
    options.method = method;
    // Get body
    if (body) options.body = JSON.stringify(body);
    // Send request
    const response = await fetch(
      `${API_URL}/${route}${query ? `${query}` : ""}`,
      options
    );
    // Get data
    const data = await response.json();
    if (data.statusCode === 200) {
      // Return data
      if (data[field]) return data[field];
    } else {
      // Create error
      const error = new Error(data.data.msg);
      // Set status
      error.status = data.statusCode;
      // Throw error
      throw error;
    }
  };

// Format date
export function formatDate(dateStr, time = false) {
  const date = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
    .format(new Date(dateStr))
    .split(" ");
  let formattedDate = ` ${date[0]} ${date[1]} ${date[2]}`;
  if (time) formattedDate += ` ${date[3]} ${date[4]}${date[5]}`;
  return formattedDate;
}

// Format time
export function formatTime(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}

// Capitalize first letter
export function capitalizeFirst(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Notify
export const notify = (message, type) =>
  toast.success(Toast, {
    closeButton: false,
    progress: undefined,
    hideProgressBar: true,
    autoClose: 4000,
    position: "bottom-left",
    icon: false,
    draggable: false,
    className: "toast",
    type: type ? type : "success",
    data: { text: message },
  });

// Get timezones
export const getTimezomes = (location) => {
  const timezones = !location
    ? []
    : ct.getCountry(location)?.timezones.map((tzID) => {
        const tz = ct.getTimezone(tzID);
        const offset = tz.utcOffset;
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const sign = offset >= 0 ? "+" : "-";
        const gmt = `GMT${sign}${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}`;
        return {
          label: `${tzID} (${gmt})`,
          value: tzID,
        };
      }) ?? [];
  return timezones;
};
