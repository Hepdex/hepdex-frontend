import styled from "styled-components";
import { flex } from "../GlobalStyles";

// BoxIcon styles
const StyledBoxIcon = styled.div`
  ${flex("center", "center")}
  background-color: var(--color-secondary);
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export default function BoxIcon({ children, ...rest }) {
  return <StyledBoxIcon {...rest}>{children}</StyledBoxIcon>;
}
