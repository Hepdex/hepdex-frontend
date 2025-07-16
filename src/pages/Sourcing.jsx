import SourcingTable from "../ui/sourcing/SourcingTable";
import DashboardTitle from "../components/DashboardTitle";
import ProtectedRoute from "../components/ProtectedRoute";
import useDocumentTitle from "../hooks/useDocumentTitle";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { getCandidates } from "../services/apiCandidate";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SourcingBox = styled.div`
  // Search talent
  .search-talent {
    ${flex(undefined, "center")}
    position: relative;

    // Input
    &__input {
      border-right: none;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
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
`;

export default function Sourcing() {
  // Search params
  const [searchParams] = useSearchParams();

  // Search
  const search = searchParams.get("jobTitle") ?? "";

  // Candidates state
  const [candidates, setCandidates] = useState(undefined);

  // Fetch candidates
  const [loading, setLoading] = useState(search ? true : false);

  // Document title
  useDocumentTitle("Sourcing");

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
          setCandidates([]);
          console.log(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [search]);

  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <SourcingBox>
        <DashboardTitle
          title="Sourcing"
          subtitle="Find top candidates, wherever they are"
          links={[{ name: "Sourcing" }]}
        />
        <SourcingTable
          loading={loading}
          candidates={candidates}
          setCandidates={setCandidates}
        />
      </SourcingBox>
    </ProtectedRoute>
  );
}
