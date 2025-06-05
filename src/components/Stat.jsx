import styled from "styled-components";
import { flex } from "../GlobalStyles";

// Stat container
const StyledStat = styled.li`
  text-align: center;
  background-color: var(--color-grey-1);
  min-width: 200px;
  border-radius: 8px;
  padding: 32px 0;
  ${flex("center", "center")}
  flex-direction: column;

  svg {
    margin-bottom: 8px;
    fill: var(--color-primary);
  }

  .stat {
    &-value {
      font-size: 32px;
      line-height: 40px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    &-text {
      font-size: 18px;
      color: var(--color-grey-2);
    }
  }
`;

export default function Stat({ value, text, icon }) {
  return (
    <StyledStat className="stat">
      {icon && icon}
      <h3 className="stat-value">{value}</h3>
      <p className="stat-text">{text}</p>
    </StyledStat>
  );
}
