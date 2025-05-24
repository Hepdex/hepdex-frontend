import LogoSvg from "../assets/logo/hepdex.svg?react";
import LogoSvgWhite from "../assets/logo/hepdex-white.svg?react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { mq } from "../GlobalStyles";

// Logo box
const LogoBox = styled(Link)`
  svg {
    height: 32px;
    ${mq(
      "sm",
      css`
        height: auto;
      `
    )}
  }
`;

export default function Logo({ alt = false, url = "/home", onClick }) {
  return (
    <LogoBox className="logo" to={url} onClick={onClick}>
      {alt ? <LogoSvgWhite /> : <LogoSvg />}
    </LogoBox>
  );
}
