import Container from "../components/Container";
import ContentLoader from "../components/ContentLoader";
import DashboardTitle from "../components/DashboardTitle";
import JobInfo from "../components/JobInfo";
import useQuery from "../hooks/useQuery";
import ApplyBox from "../ui/jobApplication/ApplyBox";
import { getJobCandidate } from "../services/apiJobs";
import { useParams } from "react-router-dom";

export default function JobApplication() {
  // Get job ID
  const { jobID } = useParams();

  // Fetch job
  const [data, loading] = useQuery(getJobCandidate, `?jobID=${jobID}`);

  //  Assign job
  const job = data?.job;

  return (
    <>
      <DashboardTitle
        title="Job application"
        subtitle="Take the next step in your career"
        links={[{ name: "Job application" }]}
      />
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          {job && (
            <Container.Row>
              <JobInfo job={job} />
              <ApplyBox jobID={jobID} />
            </Container.Row>
          )}
        </>
      )}
    </>
  );
}
