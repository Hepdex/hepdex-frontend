import { formatDistanceToNow } from "date-fns";
import {
  BsCheckCircleFill,
  BsClock,
  BsFolder,
  BsGeoAlt,
  BsHeart,
  BsHouseDoor,
  BsStar,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useUserContext } from "../context/UserContext";
import { flex, mq } from "../GlobalStyles";
import { capitalizeFirst } from "../utils/helpers";
import AvatarImage from "./AvatarImage";
import Badge from "./Badge";
import Button from "./Button";
import SaveJob from "./SaveJob";
import { useState } from "react";

// Job list styles
const StyledJobList = styled.div`
  & > ul {
    ${flex("center")}
    flex-direction: column;
    gap: 16px;

    .job {
      position: relative;
      ${flex("space-between", "start")}
      flex-direction: column;
      column-gap: 24px;
      row-gap: 16px;
      background-color: var(--color-white-1);
      border-radius: 8px;
      padding: 24px 16px;
      border: 1px solid transparent;
      cursor: pointer;

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
                margin-top: 2px;
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
        gap: 20px;
        flex-direction: column;
        ${mq(
          "820px",
          css`
            align-items: end;
          `
        )}

        .job-save--status {
          ${flex(undefined, "center")}
          gap: 12px;
          position: absolute;
          top: 20px;
          right: 16px;

          ${mq(
            "820px",
            css`
              position: static;
            `
          )}

          button {
            background-color: transparent;
          }
        }

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

      ${mq(
        "820px",
        css`
          align-items: center;
          flex-direction: row;
        `
      )}

      // Alternate
      &.alternate {
        background-color: var(--color-grey-1);

        .neutral {
          background-color: #edeef1;
          color: #454545;
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

export default function JobList({
  jobs,
  children,
  alternate = false,
  isSaved = false,
  setSavedJobs,
}) {
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

  return (
    <StyledJobList>
      <ul>
        {jobs.map((job, index) => (
          <li
            key={index}
            className={`job ${alternate ? "alternate" : ""}`}
            onClick={() => navigate(`/jobs/${job._id}`)}
          >
            <div className="job-left">
              <AvatarImage>
                {job.employer.companyLogo ? (
                  <img
                    alt="company-logo"
                    loading="lazy"
                    src={job.employer.companyLogo}
                  />
                ) : (
                  <div className="no-image">{`${job.employer.companyName.at(
                    0
                  )}`}</div>
                )}
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
            </div>
            <div className="job-right">
              <SaveJob
                isCandidate={isCandidate}
                isEmployer={isEmployer}
                className="job-save--status"
                jobID={job._id}
                defaultValue={job.isSaved}
                isSaved={isSaved}
                setSavedJobs={setSavedJobs}
              />
              <div className="job-pay">
                <span className="job-pay--price">{`${job.minSalary} - ${
                  job.maxSalary
                } ${job.currency.toUpperCase()}`}</span>
                <span className="job-pay--interval">{` / ${
                  intervals[job?.paymentInterval ?? "hourly"]
                }`}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {children}
    </StyledJobList>
  );
}
