import usePaginate from "../../hooks/usePaginate";
import TableLoader from "../../components/TableLoader";
import NoResultsTable from "../../components/NoResultsTable";
import TableBox from "../../components/TableBox";
import Button from "../../components/Button";
import Filter from "../../components/Filter";
import SourcingActions from "./SourcingActions";
import CandidateModal from "../../components/CandidateModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  BsArrowRight,
  BsChevronLeft,
  BsChevronRight,
  BsX,
} from "react-icons/bs";
import {
  Form,
  FormGroup,
  Input,
  SearchSelect,
  Select,
} from "../../components/Form";
import { capitalizeFirst, formatDate } from "../../utils/helpers";
import { countries } from "../../data/countries";

export default function SourcingTable({ loading, candidates, setCandidates }) {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Active candidate
  const [candidate, setCandidate] = useState(undefined);

  // Open menu
  const [open, setOpen] = useState(undefined);

  // Navigate hook
  const navigate = useNavigate();

  // Search
  const search = searchParams.get("jobTitle") ?? "";

  // Search input
  const [inputValue, setInputValue] = useState(search || "");

  // Clear params and candidates
  const clearParams = () => {
    setCandidates(undefined);
    navigate(window.location.pathname);
  };

  // Set params
  const setParams = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("jobTitle", value);
    setSearchParams(params);
  };

  // Job type options
  const jobTypes = ["full-time", "part-time", "contractor"];

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
      setParams(search);
    }
  }
  return (
    <TableBox>
      <div className="search-filter">
        <div className="search-talent">
          <Input
            type="text"
            placeholder="Search job title"
            className="search-talent__input"
            $sm={true}
            value={inputValue}
            onChange={(e) => {
              if (e.target.value === "") clearParams();
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.code === 13) && inputValue) {
                setParams(inputValue);
              }
            }}
          />
          <Button
            size="sm"
            className="search-talent__btn"
            onClick={() => {
              if (inputValue) setParams(inputValue);
            }}
          >
            <BsArrowRight size={18} />
          </Button>
          {search && (
            <button
              className="search-talent__clear"
              onClick={() => {
                setInputValue("");
                clearParams();
              }}
            >
              <BsX size={20} />
            </button>
          )}
        </div>
        {search && (
          <Filter id="sourcing-filter" fields={["country", "jobType"]}>
            <SearchSelect
              placeholder="Select country"
              searchPlaceholder="Search country..."
              name="country"
              required={false}
              defaultItem={
                countries.find(
                  (item) => item.name === searchParams.get("country")
                ) || {}
              }
              param={searchParams.get("country") ?? ""}
              items={countries}
              className="sm"
            />
            <Select
              name="jobType"
              defaultValue={searchParams.get("jobType")}
              alt={true}
            >
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
              <th>Register Date</th>
              <th className="sticky">
                <div></div>
              </th>
            </tr>
          </thead>
          {search && (
            <>
              {loading ? (
                <TableLoader columnLength={5} />
              ) : (
                <>
                  {dataNum > 0 && (
                    <tbody>
                      {currentData.map((item, index) => (
                        <tr key={index} onClick={() => setCandidate(item)}>
                          <td>
                            <div className="cell-box">
                              <p className="cell-box__name">{`${capitalizeFirst(
                                item.firstName
                              )} ${capitalizeFirst(item.lastName)}`}</p>
                              <ul className="cell-box__details">
                                <li>{capitalizeFirst(item.jobTitle)}</li>
                                <li>{capitalizeFirst(item.jobType)}</li>
                              </ul>
                            </div>
                          </td>
                          <td>{capitalizeFirst(item.country)}</td>
                          <td>{item.email}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <SourcingActions
                            index={index}
                            candidate={item}
                            setCandidate={setCandidate}
                            open={open}
                            setOpen={setOpen}
                          />
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
                  <Input placeholder="Search job title" name="search" />
                </FormGroup>
                <div>
                  <Button type="submit">Start search</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
      {search && !loading && dataNum === 0 && <NoResultsTable />}
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
      {candidate && (
        <CandidateModal
          candidate={candidate}
          close={() => setCandidate(undefined)}
        />
      )}
    </TableBox>
  );
}
