import styled from "styled-components";
import Container from "./Container";
import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";
import {
  BsCheckCircleFill,
  BsClock,
  BsFolder,
  BsGeoAlt,
  BsHouseDoor,
  BsXCircleFill,
} from "react-icons/bs";
import { flex } from "../GlobalStyles";
import { capitalizeFirst, formatCurrencyToK } from "../utils/helpers";
import { Link } from "react-router-dom";

// Job info container
const StyledJobInfo = styled(Card)`
  height: 100%;
  position: relative;

  .edit-job {
    position: absolute;
    top: 28px;
    right: 24px;
  }

  .job-details {
    &--top {
      ${flex("space-between", "end")}
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    &--title {
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
    }

    &--pay {
      &__price {
        font-size: 20px;
        line-height: 24px;
        font-weight: 500;
      }

      &__interval {
        color: var(--color-grey-2);
      }
    }

    &--about {
      color: var(--color-grey-2);
    }

    &--tags {
      margin-top: 12px;
      ${flex(undefined, "center")}
      gap: 8px;
      flex-wrap: wrap;
    }
  }
`;

export default function JobInfo({ job }) {
  // Payment intervals
  const intervals = { monthly: "month", annually: "year", hourly: "hour" };
  return (
    <Container.Col>
      <StyledJobInfo title="Job details" className="job-details">
        <div className="job-details--top">
          <div>
            <h2 className="job-details--title">{job.jobTitle}</h2>
            <ul className="job-details--tags">
              {job.active ? (
                <Badge className="success">
                  <BsCheckCircleFill size={14} />
                  Open
                </Badge>
              ) : (
                <Badge className="dark">
                  <BsXCircleFill size={14} />
                  Closed
                </Badge>
              )}
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
          <Button
            className="edit-job"
            size="sm"
            as={Link}
            to={`/edit-job/${job._id}`}
          >
            Edit job
          </Button>
        </div>
        <div className="job-details--bottom">
          <p className="job-details--about">{job.aboutRole}</p>
        </div>
      </StyledJobInfo>
    </Container.Col>
  );
}
