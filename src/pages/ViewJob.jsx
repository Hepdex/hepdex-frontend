import styled from "styled-components";
import Container from "../components/Container";
import DashboardTitle from "../components/DashboardTitle";
import useQuery from "../hooks/useQuery";
import ApplicationsBox from "../ui/viewJob/ApplicationsBox";
import JobDetail from "../ui/viewJob/JobDetail";
import { flex } from "../GlobalStyles";
import { getJob } from "../lib/apiJobs";
import { useParams } from "react-router-dom";

const ViewJobBox = styled.div`
  // Page card
  .page-card {
    height: 100%;
    background-color: var(--color-white-1);
    padding: 28px 24px;
    border-radius: 8px;
    // Title
    &__title {
      font-size: 18px;
      line-height: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
  // Top
  .top {
    ${flex("space-between", "center")}
    margin-bottom: 16px;
    gap: 16px;
  }
`;

export default function ViewJob() {
  const { jobID } = useParams();
  // Fetch job
  const [data, loading] = useQuery(getJob, `?jobID=${jobID}`);
  // Job
  const job = data?.job;
  return (
    <ViewJobBox>
      <DashboardTitle
        title="View job"
        subtitle="Job details and applications"
        links={[{ name: "Jobs", url: "/dashboard/jobs" }, { name: "View job" }]}
      />
      {loading && <div>Loading...</div>}
      {job && !loading && (
        <Container.Row>
          <JobDetail job={job} />
          <ApplicationsBox job={job} />
        </Container.Row>
      )}
    </ViewJobBox>
  );
}
