import styled from "styled-components";

const TableLoaderBody = styled.tbody`
  td {
    padding: 24px 16px !important;
    line-height: 0.7;
    .skeleton {
      height: 12px;
      line-height: 12px;
      border-radius: 4px;
      display: inline-block;
    }
  }
`;

export default function TableLoader({ columnLength, rowLength = 6 }) {
  return (
    <TableLoaderBody>
      {Array.from({ length: rowLength }, (_, i) => i + 1).map((index) => (
        <tr key={index}>
          {Array.from({ length: columnLength }, (_, i) => i + 1).map(
            (index) => (
              <td key={index}>
                <span
                  className="skeleton"
                  style={{
                    width: `${
                      Math.floor(Math.random() * (100 - 60 + 1)) + 60
                    }%`,
                  }}
                ></span>
              </td>
            )
          )}
        </tr>
      ))}
    </TableLoaderBody>
  );
}
