import useQuery from "../../hooks/useQuery";
import Button from "../../components/Button";
import Filter from "../../components/Filter";
import styled, { css } from "styled-components";
import { flex, mq } from "../../GlobalStyles";
import { useSearchParams } from "react-router-dom";
import { FormGroup, Input, Select } from "../../components/Form";
import { countries } from "../../data/countries";
import { getDepartments } from "../../services/apiDepartments";
import { BsSearch, BsXLg } from "react-icons/bs";

// Search box container
const StyledSearchBox = styled.div`
  background-color: var(--color-white-1);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 28px;

  .search-box {
    /* ====================
     Top Section 
  ===================== */
    &--top {
      margin-bottom: 12px;
      position: relative;
      ${flex(undefined, "center")}

      & > div:first-child {
        flex: 1;
        min-width: 200px;

        input {
          padding-right: 32px;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
          border-right: 0px;
        }
      }

      // Clear search button
      .clear-search {
        position: absolute;
        top: 50%;
        background-color: transparent;
        right: 60px;
        transform: translateY(-50%);

        svg {
          fill: #757575;
        }
      }

      // Search button
      #search-btn {
        min-width: 48px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        padding: 0px !important;
      }
    }

    &--filter {
      gap: 12px;
      flex-wrap: wrap;
      display: none;
      ${mq(
        "md",
        css`
          ${flex("space-between", "center")}
        `
      )}

      &__group {
        ${flex(undefined, "center")}
        flex-wrap: wrap;
        gap: 12px;

        .select-box {
          select {
            min-width: 180px;
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;

            // Option styles
            option {
              background-color: #fff;
              color: var(--color-grey-2);
            }
          }

          // Active
          &.active {
            svg {
              fill: var(--color-black-1);
            }

            select {
              border: 1px solid var(--color-primary);
              color: var(--color-black-1);
              background-color: var(--color-secondary);
            }
          }
        }
      }
    }

    &--mobile__filter {
      ${mq(
        "md",
        css`
          display: none;
        `
      )}
    }
  }
`;

export default function SearchBox({ inputValue, setInputValue }) {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Job title param
  const jobTitle = searchParams.get("jobTitle") ?? "";

  // Job types
  const jobTypes = ["Full-time", "Contractor", "Part-time"];

  // Params
  const urlParams = Array.from(searchParams.entries())
    .map((item) => item[0])
    .filter((item) => item !== "jobTitle" && item !== "page");

  // Departments
  const [data] = useQuery(getDepartments);

  // Set params
  const setParams = (field, value) => {
    // Get search params
    const params = new URLSearchParams(searchParams);

    // Set param
    if (value) params.set(field, value);
    // Delete param if value is empty
    else params.delete(field);

    // Delete page param
    params.delete("page");

    // Update params
    setSearchParams(params);
  };

  // Clear params
  const clearParams = () => {
    // Get search params
    const params = new URLSearchParams(searchParams);

    // Delete params
    urlParams.forEach((item) => params.delete(item));

    // Delete page param
    params.delete("page");

    // Update params
    setSearchParams(params);
  };

  // Update input
  function updateInput(e) {
    // Update job title search param
    if (!e.target.value && jobTitle) setParams("jobTitle", e.target.value);

    // Set input value
    setInputValue(e.target.value);
  }

  // Clear search
  function clearSearch() {
    // Clear param
    setParams("jobTitle", "");

    // Clear input state
    setInputValue("");
  }

  return (
    <StyledSearchBox className="search-box">
      <div className="search-box--top">
        <FormGroup>
          <Input
            type="text"
            name="jobTitle"
            placeholder="Search by job title"
            value={inputValue}
            onChange={updateInput}
          />
        </FormGroup>
        {jobTitle && (
          <button className="clear-search" onClick={clearSearch}>
            <BsXLg size={16} />
          </button>
        )}
        <Button
          id="search-btn"
          onClick={() => setParams("jobTitle", inputValue)}
        >
          <BsSearch size={18} />
        </Button>
      </div>
      <div className="search-box--filter">
        <div className="search-box--filter__group">
          <Select
            className={`select-box ${
              searchParams.get("jobType") ? "active" : ""
            }`}
            alt={true}
            value={searchParams.get("jobType") ?? ""}
            onChange={(e) => setParams("jobType", e.target.value)}
          >
            <option value="">Select job type</option>
            {jobTypes.map((option, i) => (
              <option key={i} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            className={`select-box ${
              searchParams.get("department") ? "active" : ""
            }`}
            alt={true}
            value={searchParams.get("department") ?? ""}
            onChange={(e) => setParams("department", e.target.value)}
          >
            <option value="">Select department</option>
            {data?.departments.map((dep, i) => (
              <option key={i} value={dep.name}>
                {dep.name}
              </option>
            ))}
          </Select>
          <Select
            className={`select-box ${
              searchParams.get("country") ? "active" : ""
            }`}
            alt={true}
            value={searchParams.get("country") ?? ""}
            onChange={(e) => setParams("country", e.target.value)}
          >
            <option value="">Select country</option>
            {countries.map((ct, i) => (
              <option value={ct.name} key={i}>{`${ct.flag} ${ct.name}`}</option>
            ))}
          </Select>
        </div>
        {urlParams.length > 0 && (
          <Button
            size="sm"
            className="alternate"
            color="secondary"
            onClick={clearParams}
          >
            Clear all
          </Button>
        )}
      </div>
      <div className="search-box--mobile__filter">
        <Filter
          id={"search-jobs--filter"}
          fields={["jobType", "department", "country"]}
        >
          <Select
            name="jobType"
            defaultValue={searchParams.get("jobType")}
            alt={true}
          >
            <option value="">Select job type</option>
            {jobTypes.map((option, i) => (
              <option key={i} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </Select>
          <Select
            name="country"
            defaultValue={searchParams.get("country")}
            alt={true}
          >
            <option value="">Select country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {`${country.flag} ${country.name}`}
              </option>
            ))}
          </Select>
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
    </StyledSearchBox>
  );
}
