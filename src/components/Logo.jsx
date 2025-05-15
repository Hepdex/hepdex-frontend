import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { mq } from "../GlobalStyles";

// Logo box
const LogoBox = styled(Link)`
  .logo-img {
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
      <img
        className="logo-img"
        alt="logo"
        src={`${alt ? "/hepdex-white.svg" : "/hepdex.svg"}`}
      />
    </LogoBox>
  );
}
