import styled, { css } from "styled-components";
import AvatarImage from "../../components/AvatarImage";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import { flex, mq } from "../../GlobalStyles";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { capitalizeFirst } from "../../utils/helpers";
import { BsCheckCircleFill } from "react-icons/bs";
import { useUserContext } from "../../context/UserContext";

// Job list
const StyledJobList = styled.div`
  & > ul {
    ${flex("center")}
    flex-direction: column;
    gap: 16px;

    // Job
    .job {
      ${flex("space-between", "start")}
      flex-direction: column;
      column-gap: 24px;
      row-gap: 16px;
      background-color: var(--color-white-1);
      border-radius: 8px;
      padding: 20px 16px;
      border: 1px solid transparent;
      cursor: pointer;
      ${mq(
        "820px",
        css`
          align-items: center;
          flex-direction: row;
        `
      )}

      &:hover {
        border: 1px solid var(--color-primary);
      }

      &-left {
        ${flex(undefined, "start")}
        gap: 16px;
        flex-direction: column;
        ${mq(
          "820px",
          css`
            flex-direction: row;
          `
        )}

        // No image
        .no-image {
          font-size: 28px;
          line-height: 36px;
        }

        // Job info
        .job-info {
          &--title {
            font-size: 18px;
            line-height: 24px;
            font-weight: 500;
          }

          &--text {
            ${flex(undefined, "center")}
            flex-wrap: wrap;
            column-gap: 12px;
            row-gap: 4px;
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
                font-size: 14px;
                line-height: 20px;
              }
            }
          }

          &--meta {
            ${flex(undefined, "center")}
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 12px;
          }
        }
      }

      &-right {
        ${flex("center", "start")}
        text-align: right;
        gap: 16px;
        flex-direction: column;
        ${mq(
          "820px",
          css`
            align-items: end;
          `
        )}

        .job-pay {
          &--price {
            font-size: 20px;
            line-height: 24px;
            font-weight: 500;
          }

          &--interval {
            color: var(--color-grey-2);
          }
        }
      }
    }
  }

  // Load more
  .load-more {
    ${flex("center", "center")}
    margin-top: 28px;
  }
`;

export default function JobList({ jobs, children }) {
  // Navigate hook
  const navigate = useNavigate();

  // User context
  const { user, isLoggedIn } = useUserContext();

  // Payment intervals
  const intervals = { monthly: "month", annually: "year", hourly: "hour" };

  return (
    <StyledJobList>
      <ul>
        {jobs.map((job, index) => (
          <li
            key={index}
            className="job"
            onClick={() =>
              user && isLoggedIn && user.role === "candidate"
                ? navigate(`/dashboard/find-jobs/${job._id}`)
                : navigate("/login")
            }
          >
            <div className="job-left">
              <AvatarImage>
                <div className="no-image">
                  {job.employer.companyName.slice(0, 1).toUpperCase()}
                </div>
              </AvatarImage>
              <div className="job-info">
                <h3 className="job-info--title">{job.jobTitle}</h3>
                <ul className="job-info--text">
                  <li>{job.employer.companyName}</li>
                  <li className="date">
                    {`Posted ${formatDistanceToNow(new Date(job.createdAt), {
                      addSuffix: true,
                    })}`}
                  </li>
                </ul>
                <ul className="job-info--meta">
                  <Badge className="neutral">Remote</Badge>
                  <Badge className="neutral">
                    {capitalizeFirst(job.country)}
                  </Badge>
                  <Badge className="neutral">
                    {capitalizeFirst(job.jobType)}
                  </Badge>
                  <Badge className="neutral">
                    {capitalizeFirst(job.department)}
                  </Badge>
                </ul>
              </div>
            </div>
            <div className="job-right">
              <Badge className="success">
                <BsCheckCircleFill size={16} />
                Open
              </Badge>
              <div className="job-pay">
                <span className="job-pay--price">{`${job.minSalary} - ${
                  job.maxSalary
                } ${job.currency.toUpperCase()}`}</span>
                <span className="job-pay--interval">{` / ${
                  intervals[job?.paymentInterval ?? "hourly"]
                }`}</span>
              </div>
              <Button size="xs">Apply</Button>
            </div>
          </li>
        ))}
      </ul>
      {children}
    </StyledJobList>
  );
}
