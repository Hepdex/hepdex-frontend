import styled from "styled-components";
import { flex } from "../GlobalStyles";

const NoResults = styled.div`
  background-color: var(--color-white-1);
  padding: 48px;
  ${flex("center", "center")}
  flex-direction: column;
  width: 100%;
  gap: 20px;
  text-align: center;
  // Content
  .content {
    h3 {
      font-weight: 500;
      font-size: 22px;
      line-height: 24px;
      margin-bottom: 8px;
    }
    p {
      color: var(--color-grey-2);
    }
  }
`;

export default function NoResultsTable() {
  return (
    <NoResults>
      <img src="/icons/no-result.svg" />
      <div className="content">
        <h3>No results found</h3>
        <p>Try adjusting your filters or search term.</p>
      </div>
    </NoResults>
  );
}
