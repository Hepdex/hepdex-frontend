import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";

// Details box
const StyledDetailsBox = styled.div`
  ${flex(undefined, "stretch")}
  flex-direction: column;
  ${mq(
    "1100px",
    css`
      flex-direction: row;
    `
  )}

  .details-box {
    /* ====================
     Content Section 
  ===================== */
    &--content {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      flex: 1;

      // List styles
      ul {
        padding-left: 20px;
        ${flex("center")}
        flex-direction: column;
        ${mq(
          "sm",
          css`
            padding-left: 40px;
          `
        )}

        // List item styles
        li {
          ${flex("space-between", "center")}
          gap: 16px;
          padding: 12px 0px;
          border-bottom: 1px solid #e5e7eb;

          &:first-child {
            padding-top: 0px;
          }

          .name {
            width: 33.333%;
            font-weight: 500;
          }

          .value {
            width: 33.333%;
            flex: 1;
            color: var(--color-grey-2);
            max-width: calc(100% - 16px);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          button {
            ${flex(undefined, "center")}
            background-color: transparent;
            color: var(--color-primary);
            gap: 4px;
            transition: color 0.4s ease-in-out;
            font-size: 15px;
            line-height: 20px;
            &:hover {
              color: var(--color-primary-hover);
            }
          }
        }
      }
    }

    /* ====================
     Side Section 
  ===================== */
    &--side {
      ${flex("center", "center")}
      flex-direction: column;
      gap: 16px;
      width: 100%;
      background-color: var(--color-grey-1);
      padding: 40px 32px;
      ${mq(
        "1100px",
        css`
          max-width: 380px;
        `
      )}
    }
  }
`;

export default function DetailsBox({ children }) {
  return <StyledDetailsBox>{children}</StyledDetailsBox>;
}
