import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { mq } from "../GlobalStyles";

const LogoLink = styled(Link)`
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
export default function Logo({ alt = false }) {
  return (
    <LogoLink className="logo" to={"/home"}>
      <img
        className="logo-img"
        alt="logo"
        src={`${alt ? "/hepdex-white.svg" : "/hepdex.svg"}`}
      />
    </LogoLink>
  );
}
