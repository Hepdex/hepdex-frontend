import Actions from "./Actions";
import styled from "styled-components";
import usePaginate from "../../hooks/usePaginate";
import Filter from "../../components/Filter";
import Button from "../../components/Button";
import NoResultsTable from "../../components/NoResultsTable";
import TableLoader from "../../components/TableLoader";
import TableBox from "../../components/TableBox";
import useQuery from "../../hooks/useQuery";
import { getDepartments } from "../../services/apiDepartments";
import { BsChevronLeft, BsChevronRight, BsSearch } from "react-icons/bs";
import { Input, SearchSelect, Select } from "../../components/Form";
import { useJobsContext } from "../../pages/Jobs";
import { capitalizeFirst, formatDate } from "../../utils/helpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import { flex } from "../../GlobalStyles";
import { countries } from "../../data/countries";

// Jobs table
const StyledJobsTable = styled(TableBox)`
  .table {
    tbody {
      td {
        &::first-letter {
          text-transform: uppercase;
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
  }

  .job-search {
    position: relative;
  }
`;

export default function JobsTable() {
  // Search params
  const [searchParams] = useSearchParams();

  // Jobs context
  const { jobs, loading } = useJobsContext();

  // Navigate hook
  const navigate = useNavigate();

  // Navigate to job page
  const handleNavigate = (id) => {
    navigate(`/dashboard/jobs/${id}`);
  };

  // Departments
  const [data] = useQuery(getDepartments);

  // Use paginate
  const { dataNum, pageStart, pageEnd, currentData, next, previous, search } =
    usePaginate(10, jobs, "jobTitle");

  return (
    <StyledJobsTable>
      <div className="search-filter">
        <div className="job-search">
          <Input
            placeholder="Search"
            type="text"
            $sm={true}
            value={searchParams.get("jobTitle") ?? ""}
            className="search-box__input"
            onChange={(e) => search("jobTitle", e.target.value)}
          />
          <BsSearch size={15} />
        </div>
        <Filter id="jobs-filter" fields={["country", "department"]}>
          <SearchSelect
            placeholder="Select country"
            searchPlaceholder="Search country..."
            name="country"
            defaultItem={
              countries.find(
                (item) => item.name === searchParams.get("country")
              ) || {}
            }
            required={false}
            param={searchParams.get("country") ?? ""}
            items={countries}
            className="sm"
          />
          <Select
            name="department"
            defaultValue={searchParams.get("department")}
            alt={true}
          >
            <option value="">Select department</option>
            {data?.departments.map((option, index) => (
              <option value={option.name} key={index}>
                {option.name}
              </option>
            ))}
          </Select>
        </Filter>
      </div>
      <div className="table-container">
        <table className="table jobs-table">
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
                  <td onClick={() => handleNavigate(item._id)}>
                    <div className="cell-box">
                      <p className="cell-box__name">{item.jobTitle}</p>
                      <ul className="cell-box__details">
                        <li>{capitalizeFirst(item.country)}</li>
                        <li>{capitalizeFirst(item.jobType)}</li>
                      </ul>
                    </div>
                  </td>
                  <td onClick={() => handleNavigate(item._id)}>
                    <div className="status">
                      <i
                        className={`status-icon ${
                          item.active ? "open" : "closed"
                        }`}
                      />
                      {item.active ? "Open" : "Closed"}
                    </div>
                  </td>
                  <td onClick={() => handleNavigate(item._id)}>
                    {item.applicants.length}
                  </td>
                  <td onClick={() => handleNavigate(item._id)}>
                    {item.department}
                  </td>
                  <td onClick={() => handleNavigate(item._id)}>
                    {formatDate(item.createdAt)}
                  </td>
                  <Actions
                    jobID={item._id}
                    index={index}
                    active={item.active}
                    currentDataLength={dataNum}
                  />
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {dataNum === 0 && !loading && <NoResultsTable />}
      <div className="pagination">
        {!loading && dataNum > 0 && (
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
    </StyledJobsTable>
  );
}
