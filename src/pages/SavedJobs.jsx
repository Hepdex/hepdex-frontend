import DashboardTitle from "../components/DashboardTitle";
import NoJobs from "../components/NoJobs";
import JobList from "../components/JobList";
import ContentLoader from "../components/ContentLoader";
import useQuery from "../hooks/useQuery";
import { getSavedJobs } from "../services/apiJobs";

export default function SavedJobs() {
  // Get saved jobs api
  const [savedJobs, loading, setSavedJobs] = useQuery(getSavedJobs);

  const jobs = savedJobs?.savedJobs?.map((job) => job.jobDetails) ?? [];

  return (
    <>
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
    </>
  );
}
