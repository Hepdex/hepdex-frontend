import ct from "countries-and-timezones";
import Toast from "../components/Toast";
import { toast } from "react-toastify";

export const API_URL = import.meta.env.VITE_API_URL;

// API fetcher
export const apiFetcher =
  (
    route,
    method,
    field,
    hasHeaders = true,
    hasFile = false,
    callback = false
  ) =>
  async (body = undefined, query = undefined) => {
    // Default options
    const options = {
      credentials: "include",
    };

    // Headers
    if (hasHeaders)
      options.headers = {
        "Content-Type": "application/json",
      };

    // Method
    options.method = method;

    // Get body
    if (body) options.body = hasFile ? body : JSON.stringify(body);

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
      // Callback
      if (callback) return callback(data);

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
export const getTimezones = (location) => {
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

// Get timezone of current user
export function getCurrentTimeZone() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();
  const offsetMinutes = -now.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absOffsetMinutes = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absOffsetMinutes / 60)).padStart(2, "0");
  const minutes = String(absOffsetMinutes % 60).padStart(2, "0");
  const gmtOffset = `GMT${sign}${hours}:${minutes}`;
  return `${timeZone} (${gmtOffset})`;
}

// Remove emoji from string
export const removeEmojis = (str) => {
  return str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]+|\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu,
      ""
    )
    .trim();
};

// Format currency
export function formatCurrencyToK(amount) {
  if (amount >= 1000) {
    return (amount / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return amount;
}

// Convert base64 to file or blob
export function base64ToBlob(base64, mime = "application/pdf") {
  const byteString = atob(base64.split(",")[1]);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([byteArray], { type: mime });
}
