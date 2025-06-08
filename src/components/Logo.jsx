import LogoSvg from "../assets/logo/hepdex.svg?react";
import LogoSvgWhite from "../assets/logo/hepdex-white.svg?react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { mq } from "../GlobalStyles";

// Logo styles
const StyledLogo = styled(Link)`
  svg {
    height: 32px;

    // Small screens
    ${mq(
      "sm",
      css`
        height: auto;
      `
    )}
  }
`;

export default function Logo({ alt = false, url = "/home" }) {
  return (
    <StyledLogo className="logo" to={url}>
      {alt ? <LogoSvgWhite /> : <LogoSvg />}
    </StyledLogo>
  );
}
