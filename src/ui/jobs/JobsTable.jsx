import Actions from "./Actions";
import styled from "styled-components";
import usePaginate from "../../hooks/usePaginate";
import Filter from "../../components/Filter";
import Button from "../../components/Button";
import NoResultsTable from "../../components/NoResultsTable";
import TableLoader from "../../components/TableLoader";
import { BsChevronLeft, BsChevronRight, BsSearch } from "react-icons/bs";
import { Select } from "../../components/Form";
import { useJobsContext } from "../../pages/Jobs";
import { capitalizeFirst, formatDate } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { flex } from "../../GlobalStyles";

const Table = styled.table`
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
          min-width: 12px;
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
`;

export default function JobsTable() {
  // Search params
  const [searchParams] = useSearchParams();
  // Jobs context
  const { jobs, loading } = useJobsContext();

  // Use paginate
  const { dataNum, pageStart, pageEnd, currentData, next, previous, search } =
    usePaginate(10, jobs, "jobTitle");
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
            type="text"
            value={searchParams.get("jobTitle") ?? ""}
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
        <Table className="table jobs-table">
          <thead>
            <tr>
              <th>Jobs</th>
              <th>Status</th>
              <th>Applications</th>
              <th>Department</th>
              <th>Created on</th>
              <th className="sticky">
                <div />
              </th>
            </tr>
          </thead>
          {loading ? (
            <TableLoader columnLength={6} />
          ) : (
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
                      {item.active ? "Open" : "Closed"}
                    </div>
                  </td>
                  <td>{item.applicants.length}</td>
                  <td>{item.department}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <Actions
                    jobID={item._id}
                    index={index}
                    active={item.active}
                    currentDataLength={currentData.length}
                  />
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
      {currentData.length === 0 && !loading && <NoResultsTable />}
      <div className="pagination">
        {!loading && currentData.length > 0 && (
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
    </div>
  );
}
