import Container from "../../components/Container";
import Button from "../../components/Button";
import usePaginate from "../../hooks/usePaginate";
import styled, { css } from "styled-components";
import {
  BsChevronLeft,
  BsChevronRight,
  BsPersonFill,
  BsSearch,
} from "react-icons/bs";
import { flex, mq } from "../../GlobalStyles";
import { Link, useSearchParams } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

import ViewResume from "../../components/ViewResume";
import { getResume } from "../../lib/apiResume";
import useMutate from "../../hooks/useMutate";

// Applications
const Applications = styled.div`
  &#applications-card {
    ${flex()}
    min-height: 300px;
    flex-direction: column;
    padding-bottom: 0px;
    .pagination {
      padding: 18px 0;
    }
    .top {
      // Search box
      .search-box {
        max-width: initial;
        width: 100%;
      }
    }
    .application-box {
      overflow-x: auto;
      display: grid;
      width: 100%;
      max-width: 100%;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      flex: 1;
      // Application list
      .application-list {
        &__item {
          padding: 16px 0;
          &:not(:last-child) {
            border-bottom: 1px solid #e5e7eb;
          }
          // Candidate info
          .candidate-info {
            ${flex("space-between", "center")}
            gap: 24px;
            .avatar-box__image {
              width: 48px;
              height: 48px;
              .no-image {
                font-size: 18px;
                background-color: #f3f4f6;
                color: #757575;
              }
            }
            &__profile {
              ${flex(undefined, "center")}
              gap: 16px;
              &--details {
                .name {
                  font-weight: 500;
                  font-size: 16px;
                }
                .email {
                  font-size: 14px;
                  line-height: 20px;
                  color: var(--color-grey-2);
                }
              }
            }
            // Applied
            p.applied {
              display: none;
              ${mq(
                "820px",
                css`
                  display: inline-block;
                `
              )}
            }
          }
        }
      }
    }

    // No candidates
    .no-candidates {
      ${flex("start", "center")}
      flex: 1;
      padding: 16px 0 48px 0px;
      flex-direction: column;
      text-align: center;
      h3 {
        margin-bottom: 4px;
      }
      p {
        color: var(--color-grey-2);
        margin-bottom: 16px;
      }
    }
  }
`;

export default function ApplicationsBox({ job }) {
  // Get resume
  const [fetchResume, loading] = useMutate(getResume);
  // Search params
  const [searchParams] = useSearchParams();
  // Applicants
  const applicants = job.applicants.map((item) => ({
    ...item,
    fullName: `${item.firstName} ${item.lastName}`,
  }));

  // Use paginate
  const { dataNum, pageStart, pageEnd, currentData, next, previous, search } =
    usePaginate(4, applicants, "fullName");

  return (
    <Container.Col breakPoints={[{ name: "1200px", width: 60 }]}>
      <Applications className="page-card " id="applications-card">
        <h3 className="page-card__title">Applications ({applicants.length})</h3>
        <div className="top">
          <div className="search-box">
            <BsSearch size={16} />
            <input
              placeholder="Search candidates"
              className="search-box__input"
              value={searchParams.get("fullName") ?? ""}
              onChange={(e) => search("fullName", e.target.value)}
            />
          </div>
        </div>
        {currentData.length === 0 ? (
          <div className="no-candidates">
            <h3 className="heading-sm">No candidates found</h3>
            <p>When a candidate applies, they'll appear here.</p>
            <Button size="sm" as={Link} to="/dashboard/browse-talent">
              Source candidates
            </Button>
          </div>
        ) : (
          <>
            <div className="application-box">
              <ul className="application-list">
                {currentData.map((item, index) => (
                  <li className="application-list__item" key={index}>
                    <div className="candidate-info">
                      <div className="candidate-info__profile">
                        <div className="avatar-box__image">
                          <span className="no-image">
                            <BsPersonFill size={28} />
                          </span>
                        </div>
                        <div className="candidate-info__profile--details">
                          <h3 className="name">{item.fullName}</h3>
                          <p className="email">{item.email}</p>
                        </div>
                      </div>
                      <p className="applied">
                        Applied {formatDate(item.createdAt)}
                      </p>
                      <ViewResume
                        resumePath={item.resumePath}
                        fetchResume={fetchResume}
                        loading={loading}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pagination">
              <div className="pagination-info">
                Showing
                <span className="font-medium">{` ${pageStart} - ${pageEnd} `}</span>
                of
                <span className="font-medium"> {` ${dataNum} `}</span>
                records
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
            </div>
          </>
        )}
      </Applications>
    </Container.Col>
  );
}
