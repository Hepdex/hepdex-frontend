import ApplyBox from "../ui/jobApplication/ApplyBox";
import RoleNotify from "../components/RoleNotify";
import LoginNotify from "../ui/jobApplication/LoginNotify";
import ReportJob from "../ui/jobApplication/ReportJob";
import ShareJob from "../ui/jobApplication/ShareJob";
import AvatarImage from "../components/AvatarImage";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Container from "../components/Container";
import ContentLoader from "../components/ContentLoader";
import DashboardBox from "../components/DashboardBox";
import Modal from "../components/Modal";
import SaveJob from "../components/SaveJob";
import useQuery from "../hooks/useQuery";
import NoResultIcon from "../assets/icons/no-result.svg?react";
import styled, { css } from "styled-components";
import { useUserContext } from "../context/UserContext";
import { flex, mq } from "../GlobalStyles";
import { getJob } from "../services/apiJobs";
import { Helmet } from "react-helmet";
import {
  capitalizeFirst,
  formatCurrencyToK,
  formatDate,
} from "../utils/helpers";
import { formatDistanceToNow } from "date-fns";
import {
  BsCheckCircleFill,
  BsClock,
  BsFlag,
  BsFolder,
  BsGeoAlt,
  BsHouseDoor,
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const StyledJobApplication = styled.div`
  padding: 40px 0;

  .job-details {
    max-width: 1080px;
    margin: 0 auto;
    position: relative;

    &--top {
      ${flex(undefined)}
      flex-direction: column;
      margin-bottom: 20px;
      gap: 16px;
      flex-wrap: wrap;

      ${mq(
        "md",
        css`
          flex-direction: row;
          justify-content: space-between;
        `
      )}

      .left {
        ${flex(undefined)}
        flex-direction: column;
        gap: 16px;

        ${mq(
          "600px",
          css`
            flex-direction: row;
            align-items: center;
          `
        )}

        .no-image {
          font-size: 28px;
          line-height: 36px;
        }

        .company-title {
          h3 {
            font-size: 24px;
            font-weight: 500;
            line-height: 28px;
          }

          ul {
            ${flex(undefined, "center")}
            column-gap: 12px;
            font-size: 18px;
            line-height: 24px;
            color: var(--color-grey-2);

            li {
              ${flex(undefined, "center")}
              gap: 4px;

              &:not(:first-child) {
                &::before {
                  content: "";
                  width: 4px;
                  height: 4px;
                  display: block;
                  border-radius: 50%;
                  background-color: var(--color-grey-2);
                }
              }

              // Date
              &.date {
                font-size: 16px;
                margin-top: 2px;
              }
            }
          }
        }
      }

      .right {
        ${flex(undefined, "center")}
        flex-wrap: wrap;
        gap: 16px;

        .save-job {
          position: absolute;
          top: 24px;
          right: 16px;

          ${mq(
            "sm",
            css`
              top: 32px;
              right: 24px;
            `
          )}

          ${mq(
            "md",
            css`
              position: static;
            `
          )}

          .save-btn {
            background-color: transparent;
          }
        }
      }
    }

    &--bottom {
      ${flex(undefined)}
      gap: 16px;
      row-gap: 12px;
      flex-direction: column-reverse;

      ${mq(
        "md",
        css`
          justify-content: space-between;
          flex-direction: row;
        `
      )}

      .left {
        & > ul {
          ${flex(undefined, "center")}
          gap:12px;
          flex-wrap: wrap;
        }
      }

      .right {
        .job-details--pay {
          &__price {
            font-size: 20px;
            line-height: 24px;
            font-weight: 500;
          }

          &__interval {
            color: var(--color-grey-2);
          }
        }
      }
    }

    &--content {
      margin-top: 20px;

      .right {
        .details-box {
          border-radius: 8px;
          border: 1px solid var(--color-grey-3);
          padding: 24px 16px;

          ul {
            ${flex(undefined)}
            flex-direction: column;
            gap: 16px;
            margin-bottom: 16px;

            li {
              h3 {
                font-weight: 500;
                margin-bottom: 2px;
                font-size: 18px;
                line-height: 24px;
              }

              p {
                color: var(--color-grey-2);
              }
            }
          }

          .btn-group {
            ${flex(undefined, "center")}
            gap: 8px;
          }
        }
      }
    }
  }

  .no-job {
    ${flex("center", "center")}
    padding: 32px 16px;
    flex-wrap: wrap;
    gap: 48px;

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

export default function JobApplication() {
  // Get job slug
  const { slug } = useParams();

  // Navigate hook
  const navigate = useNavigate();

  // User context
  const { user, isLoggedIn } = useUserContext();

  // Check for candidate
  const isCandidate = user?.role === "candidate" && isLoggedIn;

  // Check for employer
  const isEmployer = user?.role === "employer" && isLoggedIn;

  // Payment intervals
  const intervals = { monthly: "month", annually: "year", hourly: "hour" };

  // Fetch job
  const [data, loading] = useQuery(getJob, `/${slug}`);

  //  Assign job
  const job = data?.job;

  // Description
  const description = `${job?.jobTitle} at ${job?.employer?.companyName}`;

  return (
    <StyledJobApplication>
      {loading ? (
        <ContentLoader />
      ) : (
        <div className="job-details">
          <DashboardBox>
            {job ? (
              <>
                <Helmet>
                  <title>{`HepDex -  ${description} `}</title>
                  <meta
                    name="description"
                    content={`${job.employer.companyName} is hiring a ${job.jobTitle}, Apply now on hepdex.com/find-work.`}
                  />
                  <meta property="og:title" content={description} />
                  <meta property="og:url" content={window.location.href} />
                  <meta
                    property="og:description"
                    content="Apply on hepdex.com/find-work."
                  />
                  <meta
                    property="og:image"
                    content={`${window.location.origin}/hepdex-banner`}
                  />
                  <meta property="og:image:alt" content={description} />
                  <meta property="og:image:width" content="1200" />
                  <meta property="og:image:height" content="630" />

                  <meta property="og:type" content="website" />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:title" content={description} />
                  <meta
                    name="twitter:description"
                    content="Apply now on hepdex.com/find-work"
                  />
                  <meta
                    name="twitter:image"
                    content={`${window.location.origin}/hepdex-banner`}
                  />
                  <meta name="twitter:image:width" content="1200" />
                  <meta name="twitter:image:height" content="630" />
                </Helmet>
                <Modal>
                  <div className="job-details--top">
                    <div className="left">
                      <AvatarImage>
                        {job.employer.companyLogo ? (
                          <img
                            alt="company-logo"
                            src={`${job.employer.companyLogo}`}
                          />
                        ) : (
                          <div className="no-image">{`${job.employer.companyName.at(
                            0
                          )}`}</div>
                        )}
                      </AvatarImage>
                      <div className="company-title">
                        <h3>{job.jobTitle}</h3>
                        <ul>
                          <li>{job.employer.companyName}</li>
                          <li className="date">
                            {`Posted ${formatDistanceToNow(
                              new Date(job.createdAt),
                              {
                                addSuffix: true,
                              }
                            )}`}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="right">
                      <SaveJob
                        isCandidate={isCandidate}
                        isEmployer={isEmployer}
                        jobID={job._id}
                        className="save-job"
                        defaultValue={job.isSaved}
                      />
                      <ShareJob title={description} />
                      {job.hasApplied ? (
                        <Badge className="success md">
                          <BsCheckCircleFill size={16} /> Applied
                        </Badge>
                      ) : (
                        <Modal.Open
                          opens={`${
                            isCandidate
                              ? "apply-box"
                              : isEmployer
                              ? "role-notify"
                              : "login-notify"
                          }`}
                        >
                          <Button size="sm">Apply</Button>
                        </Modal.Open>
                      )}
                    </div>
                  </div>
                  <div className="job-details--bottom">
                    <div className="left">
                      <ul className="job-details--meta">
                        <Badge className="neutral">
                          <BsHouseDoor />
                          Remote
                        </Badge>
                        <Badge className="neutral">
                          <BsClock />
                          {capitalizeFirst(job.jobType)}
                        </Badge>
                        <Badge className="neutral">
                          <BsFolder />
                          {capitalizeFirst(job.department)}
                        </Badge>
                        <Badge className="neutral">
                          <BsGeoAlt />
                          {capitalizeFirst(job.country)}
                        </Badge>
                      </ul>
                    </div>
                    <div className="right">
                      <div className="job-details--pay">
                        <span className="job-details--pay__price">{`${formatCurrencyToK(
                          job.minSalary
                        )} - ${formatCurrencyToK(
                          job.maxSalary
                        )} ${job.currency.toUpperCase()}`}</span>
                        <span className="job-details--pay__interval">{`/${
                          intervals[job?.paymentInterval ?? "hourly"]
                        }`}</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-details--content">
                    <Container.Row>
                      <Container.Col
                        breakPoints={[{ name: "1000px", width: 70 }]}
                      >
                        <div className="left">{job.aboutRole}</div>
                      </Container.Col>
                      <Container.Col
                        breakPoints={[{ name: "1000px", width: 30 }]}
                      >
                        <div className="right">
                          <div className="details-box">
                            <ul>
                              <li>
                                <h3>Workplace</h3>
                                <p>Remote</p>
                              </li>
                              <li>
                                <h3>Location</h3>
                                <p>{capitalizeFirst(job.country)}</p>
                              </li>
                              <li>
                                <h3>Timezone</h3>
                                <p>{job.timeZone}</p>
                              </li>
                              <li>
                                <h3>Department</h3>
                                <p>{job.department}</p>
                              </li>
                              <li>
                                <h3>Job type</h3>
                                <p>{capitalizeFirst(job.jobType)}</p>
                              </li>
                              <li>
                                <h3>Pay</h3>
                                <p>{`${job.minSalary} - ${
                                  job.maxSalary
                                } ${job.currency.toUpperCase()}/${
                                  intervals[job?.paymentInterval ?? "hourly"]
                                }`}</p>
                              </li>
                              <li>
                                <h3>Published on</h3>
                                <p>{formatDate(job.createdAt)}</p>
                              </li>
                            </ul>
                            <div className="btn-group">
                              {!job.hasApplied && (
                                <Modal.Open
                                  opens={`${
                                    isCandidate
                                      ? "apply-box"
                                      : isEmployer
                                      ? "role-notify"
                                      : "login-notify"
                                  }`}
                                >
                                  <Button size="sm">Apply</Button>
                                </Modal.Open>
                              )}
                              <Modal.Open opens="report-job">
                                <Button
                                  size="sm"
                                  color="secondary"
                                  className="alternate"
                                >
                                  <BsFlag size={16} />
                                  Report job
                                </Button>
                              </Modal.Open>
                            </div>
                          </div>
                        </div>
                      </Container.Col>
                    </Container.Row>
                  </div>
                  <ApplyBox job={job} />
                  <LoginNotify />
                  <RoleNotify />
                  <ReportJob jobID={job._id} />
                </Modal>
              </>
            ) : (
              <div className="no-job">
                <div className="no-job--details">
                  <h3 className="heading-sm">The job is not available</h3>
                  <p>Feel free to browse other jobs in the meantime.</p>
                  <Button
                    size="sm"
                    onClick={() =>
                      window.history.length > 2
                        ? navigate(-1)
                        : navigate("/find-work", { replace: true })
                    }
                  >
                    Explore jobs
                  </Button>
                </div>
                <div className="no-job--icon">
                  <NoResultIcon width={228} height={228} />
                </div>
              </div>
            )}
          </DashboardBox>
        </div>
      )}
    </StyledJobApplication>
  );
}
