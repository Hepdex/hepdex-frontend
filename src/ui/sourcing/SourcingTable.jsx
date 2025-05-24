import useMutate from "../../hooks/useMutate";
import usePaginate from "../../hooks/usePaginate";
import TableLoader from "../../components/TableLoader";
import ViewResume from "../../components/ViewResume";
import NoResultsTable from "../../components/NoResultsTable";
import TableBox from "../../components/TableBox";
import Button from "../../components/Button";
import Filter from "../../components/Filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getResume } from "../../lib/apiResume";
import { useState } from "react";
import {
  BsArrowRight,
  BsChevronLeft,
  BsChevronRight,
  BsX,
} from "react-icons/bs";
import { Form, FormGroup, Input, Select } from "../../components/Form";
import { capitalizeFirst } from "../../utils/helpers";

export default function SourcingTable({
  search,
  setSearch,
  loading,
  candidates,
  setCandidates,
}) {
  // Get resume
  const [fetchResume, pending] = useMutate(getResume);
  // Search params
  const [searchParams] = useSearchParams();
  // Navigate hook
  const navigate = useNavigate();
  // Search input
  const [inputValue, setInputValue] = useState("");
  // Clear params and candidates
  const clearParams = () => {
    setCandidates(undefined);
    navigate(window.location.pathname);
  };

  // Country options
  const countries = [
    ...new Set(
      candidates?.map((candidate) => candidate.country.toLowerCase()) ?? []
    ),
  ];
  // Job type options
  const jobTypes = [
    ...new Set(
      candidates?.map((candidate) => candidate.jobType.toLowerCase()) ?? []
    ),
  ];
  // Use paginate
  const { pageEnd, pageStart, next, previous, currentData, dataNum } =
    usePaginate(10, candidates);
  // Handle form search
  function handleFormSearch(e) {
    // Prevent default submit
    e.preventDefault();
    // Get form values
    const { search } = Object.fromEntries(new FormData(e.target));
    // Check for search value
    if (search) {
      // Set input value
      setInputValue(search);
      setSearch(search);
    }
  }
  return (
    <TableBox>
      <div className="search-filter">
        <div className="search-talent">
          <input
            type="text"
            placeholder="Search candidates"
            className="search-talent__input"
            value={inputValue}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearch("");
                clearParams();
              }
              setInputValue(e.target.value);
            }}
          />
          <Button
            size="sm"
            className="search-talent__btn"
            onClick={() => {
              if (inputValue) setSearch(inputValue);
            }}
          >
            <BsArrowRight size={20} />
          </Button>
          {search && (
            <button
              className="search-talent__clear"
              onClick={() => {
                setInputValue("");
                clearParams();
                setSearch("");
              }}
            >
              <BsX size={20} />
            </button>
          )}
        </div>
        {search && (
          <Filter id="sourcing-filter" fields={["country", "jobType"]}>
            <Select name="country" defaultValue={searchParams.get("country")}>
              <option value="">Select country</option>
              {countries.map((item, index) => (
                <option value={item} key={index}>
                  {capitalizeFirst(item)}
                </option>
              ))}
            </Select>
            <Select name="jobType" defaultValue={searchParams.get("jobType")}>
              <option value="">Select job type</option>
              {jobTypes.map((item, index) => (
                <option value={item} key={index}>
                  {capitalizeFirst(item)}
                </option>
              ))}
            </Select>
          </Filter>
        )}
      </div>
      <div className="table-container">
        <table className="table sourcing-table">
          <thead>
            <tr>
              <th>Candidates</th>
              <th>Location</th>
              <th>Email</th>
              <th className="sticky">
                <div></div>
              </th>
            </tr>
          </thead>
          {search && (
            <>
              {loading ? (
                <TableLoader columnLength={4} />
              ) : (
                <>
                  {dataNum > 0 && (
                    <tbody>
                      {currentData.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="cell-box">
                              <p className="cell-box__name">{`${item.firstName} ${item.lastName}`}</p>
                              <ul className="cell-box__details">
                                <li>{capitalizeFirst(item.jobTitle)}</li>
                                <li>{capitalizeFirst(item.jobType)}</li>
                              </ul>
                            </div>
                          </td>
                          <td>{capitalizeFirst(item.country)}</td>
                          <td>{item.email}</td>
                          <td className="sticky">
                            <div>
                              <ViewResume
                                loading={pending}
                                resumePath={item.resumePath}
                                fetchResume={fetchResume}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </>
              )}
            </>
          )}
        </table>
      </div>
      {!search && (
        <div className="no-search">
          <div className="no-search__box">
            <h3 className="no-search__box--title">
              Find the perfect candidate
            </h3>
            <p className="no-search__box--text">
              Discover top talent effortlessly. Our platform connects you with
              qualified applicants who match your needs.
            </p>
            <div className="no-search__box--formbox">
              <Form $gap={24} onSubmit={handleFormSearch}>
                <FormGroup>
                  <Input placeholder="Enter job title" name="search" />
                </FormGroup>
                <div>
                  <Button type="submit">Start search</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
      {search && !loading && candidates?.length === 0 && <NoResultsTable />}
      <div className="pagination">
        {search && !loading && dataNum > 0 && (
          <>
            <div className="pagination-info">
              Showing
              <span className="font-medium">{` ${pageStart} - ${pageEnd} `}</span>
              <span className="font-medium"> {`of ${dataNum}`} </span> records
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
    </TableBox>
  );
}
