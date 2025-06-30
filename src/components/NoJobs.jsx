import NoResultIcon from "../assets/icons/no-result.svg?react";
import Button from "./Button";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { Link, useSearchParams } from "react-router-dom";

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

export default function NoJobs({ isSaved = false }) {
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

    // Update params
    setSearchParams(params);
  };

  return (
    <StyledNoJobs className="no-jobs">
      <div className="no-jobs--details">
        <h3 className="heading-sm">
          {isSaved ? "No saved jobs available" : "No jobs matching that search"}
        </h3>
        <p>
          {isSaved
            ? "You haven't saved any jobs yet"
            : "Try adjusting search terms or filters"}
        </p>
        {isSaved ? (
          <Button as={Link} size="sm" to="/dashboard/find-jobs">
            Find jobs
          </Button>
        ) : (
          <Button size="sm" onClick={clearParams}>
            Clear search and filters
          </Button>
        )}
      </div>
      <div className="no-jobs--icon">
        <NoResultIcon width={228} height={228} />
      </div>
    </StyledNoJobs>
  );
}
