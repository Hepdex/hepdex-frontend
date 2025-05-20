import Button from "../../components/Button";
import Container from "../../components/Container";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { capitalizeFirst, formatDate, formatTime } from "../../utils/helpers";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { flex } from "../../GlobalStyles";

// Job detail box
const JobDetailBox = styled.div`
  height: 100%;
  // Job status date
  .job-status__date {
    ${flex(undefined, "center")}
    gap: 12px;
    font-size: 14px;
    line-height: 20px;
    flex-wrap: wrap;
    span {
      ${flex("center", "center")}
      display: inline-flex;
      border-radius: 4px;
      gap: 6px;
      padding: 4px 12px;
      &.open {
        background-color: #e2f6e9;
        color: var(--color-black-1);
        svg {
          fill: var(--color-success);
        }
      }
      &.closed {
        background-color: #838383;
        color: var(--color-white-1);
      }
    }
    // Post date
    .post-date {
      color: var(--color-grey-2);
    }
  }
  // Job details
  .job-details {
    &__title {
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 4px;
    }
    &__info {
      color: var(--color-grey-2);
    }
    &__tags {
      margin-top: 16px;
      ${flex(undefined, "center")}
      gap: 12px;
      li {
        border-radius: 4px;
        padding: 4px 12px;
        background-color: #f3f4f6;
        font-size: 14px;
        line-height: 20px;
        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
    &__more {
      padding-left: 0px !important;
      margin-top: 24px;
      li:last-child {
        border-bottom: none;
      }
    }
  }
`;

export default function JobDetail({ job }) {
  return (
    <Container.Col breakPoints={[{ name: "1200px", width: 40 }]}>
      <JobDetailBox className="page-card">
        <h3 className="page-card__title">Job details</h3>
        <div className="top">
          <div className="job-status__date">
            {job.active ? (
              <span className="open">
                <BsCheckCircleFill size={16} />
                Open
              </span>
            ) : (
              <span className="closed">
                <BsXCircleFill size={16} />
                Closed
              </span>
            )}

            <p className="post-date">Posted {`${formatDate(job.createdAt)}`}</p>
          </div>
          <Button size="sm" as={Link} to={`/edit-job/${job._id}`}>
            Edit job
          </Button>
        </div>
        <div className="job-details">
          <h2 className="job-details__title">{job.jobTitle}</h2>
          <p className="job-details__info">{job.aboutRole}</p>
          <ul className="job-details__tags">
            <li className="job-details__tags--item">Remote</li>
            <li className="job-details__tags--item">{job.jobType}</li>
          </ul>
          <div className="details-box__content ">
            <ul className="info job-details__more">
              <li className="info-item">
                <span className="name">Pay range</span>
                <span className="value">
                  {`${job.minSalary} ${job.currency} - ${job.maxSalary} ${job.currency}`}
                </span>
              </li>
              <li className="info-item">
                <span className="name">Pay interval</span>
                <span className="value">
                  {capitalizeFirst(job.paymentInterval)}
                </span>
              </li>
              <li className="info-item">
                <span className="name">Work hours</span>
                <span className="value">
                  {`${formatTime(job.startTime)} - ${formatTime(job.endTime)}`}
                </span>
              </li>
              <li className="info-item">
                <span className="name">Location</span>
                <span className="value">{capitalizeFirst(job.country)}</span>
              </li>
              <li className="info-item">
                <span className="name">Department</span>
                <span className="value">{capitalizeFirst(job.department)}</span>
              </li>
            </ul>
          </div>
        </div>
      </JobDetailBox>
    </Container.Col>
  );
}
