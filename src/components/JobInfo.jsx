import styled from "styled-components";
import Container from "./Container";
import Card from "./Card";
import DetailsBox from "./DetailsBox";
import Badge from "./Badge";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { flex } from "../GlobalStyles";
import { capitalizeFirst, formatDate, formatTime } from "../utils/helpers";

// Job info container
const StyledJobInfo = styled(Card)`
  height: 100%;

  .job-details {
    &--top {
      ${flex("space-between", "center")}
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    &--status__date {
      ${flex(undefined, "center")}
      gap: 12px;
      font-size: 14px;
      line-height: 20px;
      flex-wrap: wrap;
    }

    &--title {
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 2px;
    }

    &--about {
      color: var(--color-grey-2);
    }

    &--tags {
      margin-top: 16px;
      ${flex(undefined, "center")}
      gap: 12px;
    }

    &--list {
      padding-left: 0px !important;
      margin-top: 24px;

      & li:last-child {
        border-bottom: none;
      }
    }
  }

  // Job d
  .job-details {
    &__tags {
      li {
        border-radius: 4px;
        padding: 4px 12px;
        background-color: #f3f4f6;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
`;

export default function JobInfo({ job, editBtn }) {
  // Payment intervals
  const intervals = { monthly: "month", annually: "year", hourly: "hour" };
  return (
    <Container.Col breakPoints={[{ name: "1200px", width: 40 }]}>
      <StyledJobInfo title="Job details" className="job-details">
        <div className="job-details--top">
          <div className="job-details--status__date">
            {job.active ? (
              <Badge className="success">
                <BsCheckCircleFill size={16} />
                Open
              </Badge>
            ) : (
              <Badge className="dark">
                <BsXCircleFill size={16} />
                Closed
              </Badge>
            )}
            <p>Posted {`${formatDate(job.createdAt)}`}</p>
          </div>
          {editBtn && editBtn}
        </div>
        <div className="job-details--bottom">
          <h2 className="job-details--title">{job.jobTitle}</h2>
          <p className="job-details--about">{job.aboutRole}</p>
          <ul className="job-details--tags">
            <Badge className="neutral">Remote</Badge>
            <Badge className="neutral">{capitalizeFirst(job.jobType)}</Badge>
          </ul>
          <DetailsBox>
            <div className="details-box--content ">
              <ul className="job-details--list">
                <li>
                  <span className="name">Payment</span>
                  <span className="value">
                    {`${job.minSalary}  - ${job.maxSalary} ${job.currency} / ${
                      intervals[job?.paymentInterval ?? "hourly"]
                    }`}
                  </span>
                </li>
                <li>
                  <span className="name">Work hours</span>
                  <span className="value">
                    {`${formatTime(job.startTime)} - ${formatTime(
                      job.endTime
                    )}`}
                  </span>
                </li>
                <li>
                  <span className="name">Timezone</span>
                  <span className="value">{job.timeZone}</span>
                </li>
                <li>
                  <span className="name">Location</span>
                  <span className="value">{capitalizeFirst(job.country)}</span>
                </li>
                <li>
                  <span className="name">Department</span>
                  <span className="value">
                    {capitalizeFirst(job.department)}
                  </span>
                </li>
              </ul>
            </div>
          </DetailsBox>
        </div>
      </StyledJobInfo>
    </Container.Col>
  );
}
