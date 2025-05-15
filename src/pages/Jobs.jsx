import usePaginate from "../hooks/usePaginate";
import Button from "../components/Button";
import DashboardTitle from "../components/DashboardTitle";
import Filter from "../components/Filter";
import useQuery from "../hooks/useQuery";
import Actions from "../ui/jobs/Actions";
import styled, { css } from "styled-components";
import {
  BsBox,
  BsCheckCircle,
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
} from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { Select } from "../components/Form";
import { flex, mq } from "../GlobalStyles";
import { fetchJobs } from "../lib/apiJobs";
import { capitalizeFirst, formatDate } from "../utils/helpers";

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
      .search-box {
        position: relative;
        max-width: 160px;
        &__input {
          padding-left: 36px;
          padding-right: 16px;
          width: 100%;
          border-radius: 4px;
          line-height: 40px;
          font-size: 15px;
          max-height: 40px;
          border: 1px solid var(--color-grey-3);
          transition: border 0.4s ease-in-out;
          &:focus {
            border-color: #757575;
          }
        }
        svg {
          position: absolute;
          top: 12px;
          left: 12px;
          fill: #757575;
        }
      }
    }
    // Jobs table
    table.jobs-table {
      tbody {
        td {
          &::first-letter {
            text-transform: uppercase;
          }
          // Job title
          .job-title {
            ${flex("center")}
            flex-direction: column;
            &__name {
              font-weight: 500;
            }
            &__details {
              font-size: 14px;
              line-height: 20px;
              color: var(--color-grey-2);
              ${flex(undefined, "center")}
              gap: 8px;
              li {
                ${flex(undefined, "center")}
                gap: 4px;
                &:not(:first-child):before {
                  content: "";
                  display: block;
                  width: 4px;
                  height: 4px;
                  border-radius: 50%;
                  background-color: var(--color-grey-2);
                }
              }
            }
          }
          // Job status
          .status {
            ${flex(undefined, "center")}
            column-gap: 8px;
            &-icon {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              display: inline-block;
              // Open
              &.open {
                background-color: #aee5c2;
              }
              // Closed
              &.closed {
                background-color: #999999;
              }
            }
          }
        }
      }
    }
  }
`;

export default function Jobs() {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  // Fetch jobs
  const [jobs, loading] = useQuery(fetchJobs);
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
        <JobsTable
          jobs={jobs?.jobs}
          loading={loading}
          searchParams={searchParams}
        />
      </div>
    </JobsBox>
  );
}

function JobsTable({ loading, jobs, searchParams }) {
  // Page
  const page = Number(searchParams.get("page") ?? 1);
  // Use paginate
  const { dataNum, pageStart, pageEnd, currentData, next, previous, search } =
    usePaginate(10, page, jobs, "jobTitle");
  // Country options
  const countries = [
    ...new Set(jobs?.map((job) => job.country.toLowerCase()) ?? []),
  ];
  // Department options
  const departments = [
    ...new Set(jobs?.map((job) => job.department.toLowerCase()) ?? []),
  ];
  return (
    <div className="table-box">
      <div className="search-filter">
        <div className="search-box">
          <input
            placeholder="Search"
            type="search"
            className="search-box__input"
            onChange={(e) => search("jobTitle", e.target.value)}
          />
          <BsSearch size={16} />
        </div>
        <Filter id="jobs-filter" fields={["country", "department"]}>
          <Select name="country" defaultValue={searchParams.get("country")}>
            <option value="">Select country</option>
            {countries.map((item, index) => (
              <option value={item} key={index}>
                {capitalizeFirst(item)}
              </option>
            ))}
          </Select>
          <Select
            name="department"
            defaultValue={searchParams.get("department")}
          >
            <option value="">Select department</option>
            {departments.map((item, index) => (
              <option value={item} key={index}>
                {capitalizeFirst(item)}
              </option>
            ))}
          </Select>
        </Filter>
      </div>
      <div className="table-container">
        {loading && <div>Loading...</div>}
        <table className="table jobs-table">
          <thead>
            <tr>
              <th>Jobs</th>
              <th>Status</th>
              <th>Applications</th>
              <th>Department</th>
              <th>Created on</th>
              <th className="sticky">
                <div></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="job-title">
                    <p className="job-title__name">{item.jobTitle}</p>
                    <ul className="job-title__details">
                      <li>{capitalizeFirst(item.country)}</li>
                      <li>{capitalizeFirst(item.jobType)}</li>
                    </ul>
                  </div>
                </td>
                <td>
                  <div className="status">
                    <i
                      className={`status-icon ${
                        item.active ? "open" : "closed"
                      }`}
                    />
                    Open
                  </div>
                </td>
                <td>{item.applicants.length}</td>
                <td>{item.department}</td>
                <td>{formatDate(item.createdAt)}</td>
                <Actions id={item._id} index={index} active={item.active} />
              </tr>
            ))}
          </tbody>
        </table>
        {currentData.length === 0 && !loading && <div>No results found</div>}
      </div>
      {!loading && (
        <div className="pagination">
          {currentData.length > 0 && (
            <>
              <div className="pagination-info">
                Showing
                <span className="font-medium">{` ${pageStart} - ${pageEnd} `}</span>
                {`of `}
                <span className="font-medium"> {dataNum}</span> records
              </div>
              <div className="pagination-controls">
                <Button
                  size="sm"
                  color="secondary"
                  className="alternate"
                  onClick={previous}
                >
                  <BsChevronLeft size={14} />
                </Button>
                <Button
                  size="sm"
                  color="secondary"
                  className="alternate"
                  onClick={next}
                >
                  <BsChevronRight size={14} />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
