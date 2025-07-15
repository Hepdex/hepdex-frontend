import styled from "styled-components";
import Container from "../components/Container";
import DashboardTitle from "../components/DashboardTitle";
import useQuery from "../hooks/useQuery";
import ApplicationsBox from "../ui/jobDetails/ApplicationsBox";
import ContentLoader from "../components/ContentLoader";
import JobInfo from "../components/JobInfo";
import Button from "../components/Button";
import ProtectedRoute from "../components/ProtectedRoute";
import { flex } from "../GlobalStyles";
import { getJob } from "../services/apiJobs";
import { Link, useParams } from "react-router-dom";
import { capitalizeFirst } from "../utils/helpers";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useUserContext } from "../context/UserContext";

const JobDetailsBox = styled.div`
  // Page card
  .page-card {
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
    margin-bottom: 12px;
    gap: 16px;
  }
`;

export default function Job() {
  // Get job ID
  const { jobID, slug } = useParams();

  // User context
  const { user } = useUserContext();

  // Fetch job
  const [data, loading] = useQuery(getJob, `?jobID=${jobID}`);

  // Job
  const job = data?.job;

  // Title
  const title = (() => {
    const arr = slug.split("-");
    arr.pop();
    return capitalizeFirst(arr.join(" "));
  })();

  // Document title
  useDocumentTitle(`${title} for ${user.companyName}`);

  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <JobDetailsBox>
        <DashboardTitle
          title={title}
          subtitle={`Manage job info and applications`}
          links={[
            { name: "Jobs", url: "/dashboard/jobs" },
            { name: `${title}` },
          ]}
        />
        {loading ? (
          <ContentLoader />
        ) : (
          <>
            {job && (
              <Container.Row>
                <JobInfo
                  job={job}
                  editBtn={
                    <Button size="sm" as={Link} to={`/edit-job/${job._id}`}>
                      Edit job
                    </Button>
                  }
                />
                <ApplicationsBox job={job} />
              </Container.Row>
            )}
          </>
        )}
      </JobDetailsBox>
    </ProtectedRoute>
  );
}
