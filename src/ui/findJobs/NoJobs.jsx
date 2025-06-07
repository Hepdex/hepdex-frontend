import styled, { css } from "styled-components";
import NoResultIcon from "../../assets/icons/no-result.svg?react";
import Button from "../../components/Button";
import { flex, mq } from "../../GlobalStyles";
import { useSearchParams } from "react-router-dom";

const StyledNoJobs = styled.div`
  ${flex("center", "center")}
  padding: 32px 16px;
  flex-wrap: wrap;
  gap: 48px;

  .no-jobs {
    &--details {
      text-align: center;
      ${mq(
        "sm",
        css`
          text-align: unset;
        `
      )}

      p {
        margin: 4px 0 16px 0;
        color: var(--color-grey-2);
      }
    }
  }
`;

export default function NoJobs({ setInputValue }) {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Params
  const urlParams = Array.from(searchParams.entries()).map((item) => item[0]);

  // Clear params
  const clearParams = () => {
    // Get search params
    const params = new URLSearchParams(searchParams);

    // Delete params
    urlParams.forEach((item) => params.delete(item));

    // Delete page param
    params.delete("page");

    // Update input value
    setInputValue("");

    // Update params
    setSearchParams(params);
  };

  return (
    <StyledNoJobs className="no-jobs">
      <div className="no-jobs--details">
        <h3 className="heading-sm">No jobs matching that search</h3>
        <p>Try adjusting search terms or filters</p>
        <Button size="sm" onClick={clearParams}>
          Clear search and filters
        </Button>
      </div>
      <div className="no-jobs--icon">
        <NoResultIcon width={228} height={228} />
      </div>
    </StyledNoJobs>
  );
}
