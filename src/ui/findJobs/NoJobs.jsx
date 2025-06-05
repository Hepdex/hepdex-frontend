import styled, { css } from "styled-components";
import NoResultIcon from "../../assets/icons/no-result.svg?react";
import Button from "../../components/Button";
import { flex, mq } from "../../GlobalStyles";

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

export default function NoJobs() {
  return (
    <StyledNoJobs className="no-jobs">
      <div className="no-jobs--details">
        <h3 className="heading-sm">No jobs matching that search</h3>
        <p>Try adjusting search terms or filters</p>
        <Button size="sm">Clear search and filters</Button>
      </div>
      <div className="no-jobs--icon">
        <NoResultIcon width={228} height={228} />
      </div>
    </StyledNoJobs>
  );
}
