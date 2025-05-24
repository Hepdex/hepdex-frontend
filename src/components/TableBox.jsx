import styled from "styled-components";
import { flex } from "../GlobalStyles";

const TableBoxDiv = styled.div`
  ${flex("center")}
  flex-direction: column;
  // Search filter
  .search-filter {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    gap: 12px;
    background-color: var(--color-white-1);
    ${flex(undefined, "center")}
    padding: 12px 16px;
    flex-wrap: wrap;
  }
  // Table container
  .table-container {
    overflow-x: auto;
    display: grid;
    width: 100%;
    max-width: 100%;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    // Table
    .table {
      table-layout: auto;
      border-spacing: 0;
      border-collapse: collapse;
      min-width: 100%;
      width: max-content;
      thead {
        letter-spacing: 0px;
        line-height: 56px;
        background-color: #f7f7f7;
        color: var(--color-grey-2);
        th {
          text-transform: uppercase;
          font-weight: 500;
          font-size: 12px;
        }
      }
      tbody {
        background-color: var(--color-white-1);
        tr {
          cursor: pointer;
          &:hover {
            td {
              background-color: #fcfcfc;
            }
          }
          &:not(:last-child) {
            border-bottom: 1px solid #e5e7eb;
          }
          td {
            padding: 8px 16px;
            // Cell box
            .cell-box {
              ${flex("center")}
              flex-direction: column;
              // Name
              &__name {
                font-weight: 500;
              }
              // Details
              &__details {
                font-size: 14px;
                line-height: 20px;
                color: var(--color-grey-2);
                ${flex(undefined, "center")}
                gap: 8px;
                li {
                  ${flex(undefined, "center")}
                  gap: 4px;
                  &:not(:first-child):before {
                    content: "";
                    display: block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background-color: var(--color-grey-2);
                  }
                }
              }
            }
          }
        }
      }
      tr {
        width: 100%;
        // Sticky
        .sticky {
          width: 64px;
          position: sticky;
          right: 0;
          padding: 0px;
          overflow-y: clip;
          height: 60px;
          background-color: var(--color-white-1);
          & > * {
            height: 100%;
            box-shadow: -2px 0 10px 0 #e5e7eb;
            ${flex("center", "center")}
          }
          // Sticky button
          &-btn {
            height: 36px;
            width: 36px;
            ${flex("center", "center")}
            border-radius: 50%;
            background-color: transparent;
            transition: background-color 0.4s ease-in-out;
            svg {
              pointer-events: none;
            }
            &:hover {
              background-color: #f3f4f6;
            }
          }
        }
        td,
        th {
          text-align: left;
          white-space: nowrap;
        }
        th {
          padding: 0px 16px;
          &.sticky {
            background-color: #f7f7f7;
            height: 56px;
          }
        }
      }
    }
  }
`;

export default function TableBox({ children, ...rest }) {
  return <TableBoxDiv {...rest}>{children}</TableBoxDiv>;
}
