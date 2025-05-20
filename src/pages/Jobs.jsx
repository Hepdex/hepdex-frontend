import useQuery from "../hooks/useQuery";
import DashboardTitle from "../components/DashboardTitle";
import Button from "../components/Button";
import JobsTable from "../ui/jobs/JobsTable";
import styled, { css } from "styled-components";
import { BsBox, BsCheckCircle } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { flex, mq } from "../GlobalStyles";
import { createContext, useContext } from "react";
import { fetchJobs } from "../lib/apiJobs";

const JobsBox = styled.div`
  .jobs {
    ${flex("center")}
    flex-direction: column;
    gap: 16px;
    // Top bar
    .top-bar {
      background-color: var(--color-white-1);
      padding: 16px;
      border-radius: 8px;
      ${flex("space-between", "center")}
      gap: 12px;
      flex-wrap: wrap;
      // Tab
      .status-bar {
        width: 100%;
        gap: 12px;
        ${flex(undefined, "stretch")}
        flex-wrap: wrap;
        &__item {
          &#add-job {
            ${mq(
              "880px",
              css`
                flex: 1;
                ${flex("end")}
              `
            )}
          }
        }
        // Tab button
        &__btn {
          font-weight: 500;
          svg {
            transition: fill 0.4s ease-in-out;
          }
          // Active tab
          &.active {
            color: var(--color-black-1);
            border-color: var(--color-primary);
            background-color: var(--color-secondary);
            svg {
              fill: var(--color-primary);
            }
          }
        }
        // Separator
        &__separator {
          height: 100%;
          border-right: 1px solid #e5e7eb;
        }
      }
    }
    // Search filter
    .search-filter {
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      gap: 12px;
      background-color: var(--color-white-1);
      ${flex(undefined, "center")}
      padding: 12px 16px;
      flex-wrap: wrap;
      & > * {
        ${mq(
          "360px",
          css`
            width: auto;
          `
        )}
      }
    }
  }
`;

// Jobs context
const JobsContext = createContext(undefined);

export default function Jobs() {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  // Fetch jobs
  const [jobs, loading, setJobs] = useQuery(fetchJobs);
  // Selected tab
  const status = searchParams.get("active") ?? "";
  // Set params
  const handleSetParams = (field, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(field, value);
    // Delete page
    params.delete("page");
    // Delete param if value is empty
    if (value === "") params.delete(field);
    setSearchParams(params);
  };

  return (
    <JobsBox>
      <DashboardTitle
        title="Jobs"
        subtitle="Recruit top talent, wherever they are"
        links={[{ name: "Jobs" }]}
      />
      <div className="jobs">
        <div className="top-bar">
          <ul className="status-bar">
            <li className="status-bar__item">
              <Button
                color="secondary"
                size="sm"
                className={`status-bar__btn alternate ${
                  status === "" ? "active" : ""
                }`}
                onClick={() => handleSetParams("active", "")}
              >
                All jobs {jobs?.jobs.length ? `(${jobs.jobs.length})` : ""}
              </Button>
            </li>
            <li className="status-bar__item">
              <div className="status-bar__separator" />
            </li>
            <li className="status-bar__item">
              <Button
                size="sm"
                color="secondary"
                className={`status-bar__btn alternate ${
                  status === "true" ? "active" : ""
                }`}
                onClick={() => handleSetParams("active", "true")}
              >
                <BsCheckCircle size={16} />
                Open
                {jobs?.jobs.length
                  ? ` (${jobs.jobs.filter((item) => item.active).length})`
                  : ""}
              </Button>
            </li>
            <li className="status-bar__item">
              <Button
                size="sm"
                color="secondary"
                className={`status-bar__btn alternate ${
                  status === "false" ? "active" : ""
                }`}
                onClick={() => handleSetParams("active", "false")}
              >
                <BsBox size={16} />
                Closed
                {jobs?.jobs.length
                  ? ` (${jobs.jobs.filter((item) => !item.active).length})`
                  : ""}
              </Button>
            </li>
            <li className="status-bar__item" id="add-job">
              <Button size="sm" as={Link} to="/post-a-job">
                Add Job
              </Button>
            </li>
          </ul>
        </div>
        <JobsContext.Provider value={{ jobs: jobs?.jobs, setJobs, loading }}>
          <JobsTable />
        </JobsContext.Provider>
      </div>
    </JobsBox>
  );
}

// Use jobs context
export const useJobsContext = () => {
  const context = useContext(JobsContext);
  if (context === undefined)
    throw new Error("JobsContext was used outside provider");
  return context;
};
