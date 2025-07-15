import DashboardTitle from "../components/DashboardTitle";
import NoJobs from "../components/NoJobs";
import JobList from "../components/JobList";
import ContentLoader from "../components/ContentLoader";
import useQuery from "../hooks/useQuery";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ProtectedRoute from "../components/ProtectedRoute";
import { getSavedJobs } from "../services/apiJobs";

export default function SavedJobs() {
  // Get saved jobs api
  const [savedJobs, loading, setSavedJobs] = useQuery(getSavedJobs);

  // Saved jobs
  const jobs = savedJobs?.savedJobs?.map((job) => job.jobDetails) ?? [];

  // Document title
  useDocumentTitle("Saved jobs");

  return (
    <ProtectedRoute allowedRoles={["candidate"]}>
      <DashboardTitle
        title="Saved jobs"
        subtitle="Your saved opportunities"
        links={[{ name: "Saved jobs" }]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          {jobs.length > 0 ? (
            <JobList jobs={jobs} isSaved setSavedJobs={setSavedJobs} />
          ) : (
            <NoJobs isSaved />
          )}
        </>
      )}
    </ProtectedRoute>
  );
}
