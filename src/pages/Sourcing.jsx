import SourcingTable from "../ui/sourcing/SourcingTable";
import DashboardTitle from "../components/DashboardTitle";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { getCandidates } from "../lib/apiCandidates";
import { useEffect, useState } from "react";

const SourcingBox = styled.div`
  // Search talent
  .search-talent {
    ${flex(undefined, "center")}
    position: relative;
    // Input
    &__input {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding: 0 12px;
      border: 1px solid var(--color-grey-3);
      border-right: none;
      line-height: 40px;
      max-height: 40px;
      background-color: var(--color-white-1);
      font-size: 15px;
      flex: 1;
      max-width: 200px;
      ${mq(
        "sm",
        css`
          min-width: 280px;
          max-width: initial;
        `
      )}
    }
    // Button
    &__btn {
      min-width: initial;
      width: 40px;
      height: 40px;
      padding: 0px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
    // Clear
    &__clear {
      position: absolute;
      top: 50%;
      right: 52px;
      transform: translateY(-50%);
      background-color: transparent;
      svg {
        fill: #757575;
      }
    }
  }

  // No search
  .no-search {
    background-color: var(--color-white-1);
    padding: 48px;
    // Box
    &__box {
      max-width: 380px;
      margin: 0 auto;
      text-align: center;
      // Title
      &--title {
        font-size: 22px;
        line-height: 28px;
        font-weight: 500;
      }
      // Text
      &--text {
        color: var(--color-grey-2);
        margin: 8px 0px 16px 0px;
      }
    }
  }

  // Table
  table {
    td,
    th {
      &.sticky {
        width: 98px !important;
      }
    }
  }
`;

export default function Sourcing() {
  // Search state
  const [search, setSearch] = useState("");
  // Candidates state
  const [candidates, setCandidates] = useState(undefined);
  // Fetch candidates
  const [loading, setLoading] = useState(false);

  // Fetch candidates
  useEffect(() => {
    if (search) {
      // Send request
      (async () => {
        try {
          // Set loading state
          setLoading(true);
          const response = await getCandidates(
            undefined,
            `?jobTitle=${search}`
          );
          if (response?.candidates) {
            setCandidates(response.candidates);
          }
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [search]);

  return (
    <SourcingBox>
      <DashboardTitle
        title="Sourcing"
        subtitle="Find top candidates, wherever they are"
        links={[{ name: "Sourcing" }]}
      />
      <SourcingTable
        search={search}
        setSearch={setSearch}
        loading={loading}
        candidates={candidates}
        setCandidates={setCandidates}
      />
    </SourcingBox>
  );
}
