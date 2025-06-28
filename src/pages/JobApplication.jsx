import ApplyBox from "../ui/jobApplication/ApplyBox";
import EmployerNotify from "../ui/jobApplication/EmployerNotify";
import LoginNotify from "../ui/jobApplication/LoginNotify";
import ReportJob from "../ui/jobApplication/ReportJob";
import ShareJob from "../ui/jobApplication/ShareJob";
import styled from "styled-components";
import AvatarImage from "../components/AvatarImage";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Container from "../components/Container";
import ContentLoader from "../components/ContentLoader";
import DashboardBox from "../components/DashboardBox";
import Modal from "../components/Modal";
import useQuery from "../hooks/useQuery";
import Save from "../assets/icons/save.svg?react";
import Saved from "../assets/icons/saved.svg?react";
import { useUserContext } from "../context/UserContext";
import { flex } from "../GlobalStyles";
import { getJobCandidate } from "../services/apiJobs";
import { capitalizeFirst, formatDate } from "../utils/helpers";
import { formatDistanceToNow } from "date-fns";
import {
  BsCheckCircleFill,
  BsClock,
  BsFlag,
  BsFolder,
  BsGeoAlt,
  BsHouseDoor,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import SaveJob from "../components/SaveJob";

const StyledJobApplication = styled.div`
  padding: 40px 0;

  .job-details {
    max-width: 1080px;
    margin: 0 auto;
    &--top {
      ${flex("space-between", "center")}
      margin-bottom: 24px;
      gap: 16px;
      flex-wrap: wrap;

      .left,
      .right {
        ${flex(undefined, "center")}
        flex-wrap: wrap;
        gap: 16px;
      }

      .left {
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
        .save-btn {
          background-color: transparent;
        }
      }
    }

    &--bottom {
      ${flex("space-between", "center")}
      gap: 16px;
      flex-wrap: wrap;

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
      margin-top: 24px;

      .left {
        color: var(--color-grey-2);
      }

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
`;

export default function JobApplication() {
  // Get job ID
  const { jobID } = useParams();

  // User context
  const { user, isLoggedIn } = useUserContext();

  // Check for candidate
  const isCandidate = user?.role === "candidate" && isLoggedIn;

  // Check for employer
  const isEmployer = user?.role === "employer" && isLoggedIn;

  // Payment intervals
  const intervals = { monthly: "month", annually: "year", hourly: "hour" };

  // Fetch job
  const [data, loading] = useQuery(getJobCandidate, `?jobID=${jobID}`);

  //  Assign job
  const job = data?.job;

  return (
    <StyledJobApplication>
      {loading ? (
        <ContentLoader />
      ) : (
        <div className="job-details">
          {job && (
            <DashboardBox>
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
                      defaultValue={job.isSaved}
                    />

                    <ShareJob title={job.jobTitle} />
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
                            ? "employer-notify"
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
                      <span className="job-details--pay__price">{`${
                        job.minSalary
                      } - ${
                        job.maxSalary
                      } ${job.currency.toUpperCase()}`}</span>
                      <span className="job-details--pay__interval">{` / ${
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
                              } ${job.currency.toUpperCase()} / ${
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
                                    ? "employer-notify"
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
                <EmployerNotify />
                <ReportJob jobID={job._id} />
              </Modal>
            </DashboardBox>
          )}
        </div>
      )}
    </StyledJobApplication>
  );
}
