import Button from "./Button";
import Spinner from "./Spinner";
import { notify } from "../utils/helpers";

export default function ViewResume({ resumePath, fetchResume, loading }) {
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
      // Display error message
      notify(response, "error");
    }
  }
  return (
    <Button
      size="xs"
      $loading={loading}
      disabled={loading}
      onClick={() => {
        handleGetResume(resumePath);
      }}
    >
      <span>View</span>
      {loading && <Spinner />}
    </Button>
  );
}
