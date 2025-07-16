import Container from "../../components/Container";
import Button from "../../components/Button";
import usePaginate from "../../hooks/usePaginate";
import AvatarImage from "../../components/AvatarImage";
import styled, { css } from "styled-components";
import {
  BsBook,
  BsBookHalf,
  BsBookshelf,
  BsCheckCircle,
  BsChevronLeft,
  BsChevronRight,
  BsPersonFill,
  BsPlusCircle,
  BsSearch,
  BsXCircle,
} from "react-icons/bs";
import { flex, mq } from "../../GlobalStyles";
import { Link, useSearchParams } from "react-router-dom";
import { capitalizeFirst, formatDate } from "../../utils/helpers";
import { Input } from "../../components/Form";
import TableBox from "../../components/TableBox";
import ApplicantActions from "./ApplicantActions";
import { createContext, useContext, useState } from "react";
import CandidateModal from "../../components/CandidateModal";

// Applications container
const StyledApplicationsBox = styled.div`
  &#applications-card {
    ${flex()}

    flex-direction: column;
    padding: 28px 0 0 0;

    & > h3 {
      padding: 0 24px;
    }

    .top {
      padding: 0 24px;
      justify-content: start;
      flex-wrap: wrap;

      // Application box
      .application-search {
        position: relative;
      }

      .status-bar {
        gap: 12px;
        ${flex(undefined, "stretch")}
        flex-wrap: wrap;
        &__item {
          &#add-job {
            ${mq(
              "880px",
              css`
                flex: 1;
                ${flex("end")}
              `
            )}
          }
        }
        // Tab button
        &__btn {
          font-weight: 500;
          svg {
            transition: fill 0.4s ease-in-out;
          }
          // Active tab
          &.active {
            color: var(--color-black-1);
            border-color: var(--color-primary);
            background-color: var(--color-secondary);
            svg {
              fill: var(--color-primary);
            }
          }
        }
        // Separator
        &__separator {
          height: 100%;
          border-right: 1px solid #e5e7eb;
        }
      }
    }

    table {
      th:not(:last-child) {
        padding: 0 24px;
      }

      td:not(:last-child) {
        padding: 8px 24px;
      }

      // Candidate info
      .candidate-info {
        ${flex("space-between", "center")}
        gap: 24px;

        &__profile {
          ${flex(undefined, "center")}
          gap: 12px;
          min-height: 44px;

          &--details {
            .name {
              font-weight: 400;
              font-size: 16px;
            }
          }
        }
      }
    }

    // No candidates
    .no-candidates {
      ${flex("center", "center")}
      flex: 1;
      padding: 16px;
      flex-direction: column;
      text-align: center;
      min-height: 240px;

      h3 {
        margin-bottom: 4px;
      }

      p {
        color: var(--color-grey-2);
        margin-bottom: 16px;
      }
    }

    // Pagination
    .pagination {
      padding: 16px 24px;
    }
  }
`;

// Applications context
const ApplicationsContext = createContext(undefined);

export default function ApplicationsBox({ job }) {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Current candidate
  const [candidate, setCandidate] = useState(undefined);

  // Applicants state
  const [applicantsData, setApplicantsData] = useState(job.applicants);

  // Active menu state
  const [open, setOpen] = useState(undefined);

  // Selected tab
  const status = searchParams.get("hiredStatus") ?? "b";

  // Applicants
  const applicants = applicantsData
    .map((item) => ({
      ...item,
      fullName: `${capitalizeFirst(item.firstName)} ${capitalizeFirst(
        item.lastName
      )}`,
    }))
    .filter((item) => item.hiredStatus === status);

  // Use paginate
  const { dataNum, pageStart, pageEnd, currentData, next, previous, search } =
    usePaginate(4, applicants, "fullName");

  // Set params
  const handleSetParams = (field, value) => {
    // New params
    const params = new URLSearchParams(searchParams);

    // Set param
    params.set(field, value);

    // Delete page
    params.delete("page");

    // Delete param if value is empty
    if (value === "") params.delete(field);

    // Update params state
    setSearchParams(params);
  };

  return (
    <Container.Col>
      <StyledApplicationsBox className="page-card" id="applications-card">
        <h3 className="page-card__title">
          Applications ({applicantsData.length})
        </h3>
        <div className="top">
          <div className="application-search">
            <Input
              placeholder="Search candidates"
              className="search-box__input"
              value={searchParams.get("fullName") ?? ""}
              onChange={(e) => search("fullName", e.target.value)}
              $sm={true}
            />
            <BsSearch size={15} fill="#757575" />
          </div>
          <ul className="status-bar">
            <li className="status-bar__item">
              <Button
                color="secondary"
                size="sm"
                className={`status-bar__btn alternate ${
                  status === "b" ? "active" : ""
                }`}
                onClick={() => handleSetParams("hiredStatus", "b")}
              >
                <BsBook size={16} />
                Applied (
                {applicantsData.filter((item) => item.hiredStatus === "b")
                  ?.length ?? 0}
                )
              </Button>
            </li>
            <li className="status-bar__item">
              <Button
                size="sm"
                color="secondary"
                className={`status-bar__btn alternate ${
                  status === "a" ? "active" : ""
                }`}
                onClick={() => handleSetParams("hiredStatus", "a")}
              >
                <BsPlusCircle size={16} />
                Shortlist (
                {applicantsData.filter((item) => item.hiredStatus === "a")
                  ?.length ?? 0}
                )
              </Button>
            </li>
            <li className="status-bar__item">
              <Button
                size="sm"
                color="secondary"
                className={`status-bar__btn alternate ${
                  status === "r" ? "active" : ""
                }`}
                onClick={() => handleSetParams("hiredStatus", "r")}
              >
                <BsXCircle size={16} />
                Rejected (
                {applicantsData.filter((item) => item.hiredStatus === "r")
                  ?.length ?? 0}
                )
              </Button>
            </li>
            <li className="status-bar__item">
              <Button
                size="sm"
                color="secondary"
                className={`status-bar__btn alternate ${
                  status === "h" ? "active" : ""
                }`}
                onClick={() => handleSetParams("hiredStatus", "h")}
              >
                <BsCheckCircle size={16} />
                Hired (
                {applicantsData.filter((item) => item.hiredStatus === "h")
                  ?.length ?? 0}
                )
              </Button>
            </li>
          </ul>
        </div>
        <TableBox>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Candidates</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Applied On</th>
                  <th className="sticky">
                    <div />
                  </th>
                </tr>
              </thead>
              <ApplicationsContext.Provider
                value={{
                  setApplicantsData,
                  setCandidate,
                }}
              >
                {dataNum > 0 && (
                  <tbody>
                    {currentData
                      .filter((item) => item.hiredStatus === status)
                      .map((item, index) => (
                        <tr key={index} onClick={() => setCandidate(item)}>
                          <td>
                            <div className="candidate-info__profile">
                              <AvatarImage size={36} bgColor="#f3f4f6">
                                <span className="no-image">
                                  <BsPersonFill size={20} fill="#757575" />
                                </span>
                              </AvatarImage>
                              <div className="candidate-info__profile--details">
                                <h3 className="name">
                                  {capitalizeFirst(item.fullName)}
                                </h3>
                              </div>
                            </div>
                          </td>
                          <td>{item.email}</td>
                          <td>{item.phoneNo}</td>
                          <td>{capitalizeFirst(item.country)}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <ApplicantActions
                            currentDataLength={dataNum}
                            index={index}
                            application={item}
                            active={status}
                            open={open}
                            setOpen={setOpen}
                          />
                        </tr>
                      ))}
                  </tbody>
                )}
              </ApplicationsContext.Provider>
            </table>
          </div>
          {dataNum === 0 && (
            <div className="no-candidates">
              <h3 className="heading-sm">No candidates found</h3>
              <p>
                When a candidate{" "}
                {status === "b"
                  ? "applies"
                  : status === "a"
                  ? "is shortlisted"
                  : status === "r"
                  ? "is rejected"
                  : status === "h"
                  ? "is hired"
                  : "applies"}
                , they'll appear here.
              </p>
              <Button size="sm" as={Link} to="/dashboard/browse-talent">
                Source candidates
              </Button>
            </div>
          )}
          <div className="pagination">
            {dataNum > 0 && (
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
          {candidate && (
            <CandidateModal
              candidate={candidate}
              close={() => setCandidate(undefined)}
            />
          )}
        </TableBox>
      </StyledApplicationsBox>
    </Container.Col>
  );
}

// Use applications context
export const useApplicationsContext = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined)
    throw new Error("ApplicationsContext was used outside provider");
  return context;
};
