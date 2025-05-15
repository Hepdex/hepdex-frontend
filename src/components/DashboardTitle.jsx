import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { flex, mq } from "../GlobalStyles";

// Title box
const TitleBox = styled.div`
  ${flex("space-between", "start")}
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  ${mq(
    "md",
    css`
      flex-direction: row;
    `
  )}
  // Title
  .title {
    h1 {
      font-size: 24px;
      line-height: 28px;
      font-weight: 500;
      ${mq(
        "md",
        css`
          font-size: 28px;
          line-height: 40px;
        `
      )}
    }
    // Subtitle
    p {
      font-size: 16px;
      ${mq(
        "md",
        css`
          font-size: 18px;
        `
      )}
      color: var(--color-grey-2);
    }
  }
  // Breadcrumb
  .breadcrumb {
    ${flex(undefined, "center")}
    gap: 6px;
    ${mq(
      "md",
      css`
        margin-top: 8px;
      `
    )}
    li {
      ${flex(undefined, "center")}
      a {
        color: var(--color-primary);
        &:hover {
          color: var(--color-primary-hover);
          text-decoration: underline;
        }
      }
    }
  }
`;

export default function DashboardTitle({ title, subtitle, links }) {
  return (
    <TitleBox>
      {title && (
        <div className="title">
          <h1>{title}</h1>
          {subtitle && <p className="text-md subtitle">{subtitle}</p>}
        </div>
      )}
      {links && (
        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/home">Home</Link>
          </li>
          <li>
            <span>{`>`}</span>
          </li>
          {links.map((item, index) => (
            <React.Fragment key={index}>
              <li>
                {item.url ? (
                  <Link to={item.url}>{item.name}</Link>
                ) : (
                  <span>{item.name}</span>
                )}
              </li>
              {index + 1 !== links.length && (
                <li>
                  <span>{`>`}</span>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </TitleBox>
  );
}
