import Button from "./Button";
import { notify } from "../utils/helpers";

export default function ViewResume({
  resumePath,
  fetchResume,
  loading,
  size = "xs",
  text = "View",
  color = "primary",
  ...rest
}) {
  // Handle get resume
  async function handleGetResume() {
    // Check for path
    if (!resumePath) return;

    // Send request
    const response = await fetchResume(undefined, `?resumePath=${resumePath}`);

    // Check for resume url
    if (response.signedUrl) {
      // Navigate to url
      window.open(response.signedUrl, "_blank", "noopener,noreferrer");
    } else {
      // Error
      notify(response, "error");
    }
  }

  return (
    <Button
      size={size}
      disabled={loading}
      color={color}
      onClick={() => {
        handleGetResume(resumePath);
      }}
      {...rest}
    >
      <span>{text}</span>
    </Button>
  );
}
