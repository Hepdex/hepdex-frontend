import LogoSvg from "../assets/logo/hepdex.svg?react";
import LogoSvgWhite from "../assets/logo/hepdex-white.svg?react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { mq } from "../GlobalStyles";

// Logo styles
const StyledLogo = styled.div`
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
  return url ? (
    <StyledLogo className="logo" as={Link} to={url}>
      {alt ? <LogoSvgWhite /> : <LogoSvg />}
    </StyledLogo>
  ) : (
    <StyledLogo className="logo">
      {alt ? <LogoSvgWhite /> : <LogoSvg />}
    </StyledLogo>
  );
}
