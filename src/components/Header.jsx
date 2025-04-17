import styled from "styled-components";
import Container from "./Container";
import Logo from "./logo";
import Button from "./button";
import { flex } from "../GlobalStyles";
import { NavLink, Link } from "react-router-dom";

const Div = styled.div`
  ${flex("space-between", "center")}
  padding: 16px 0px;
  // Left
  .left {
    gap: 56px;
    &,
    .nav {
      ${flex(undefined, "center")}
    }
  }
  // Right
  .right {
    ul {
      gap: 16px;
      ${flex(undefined, "center")}
    }
  }
  ul li a {
    padding: 8px 16px;
    transition: all 0.4s ease-in-out;
    &.nav-link {
      &.active,
      &:hover {
        color: var(--color-primary);
      }
    }
  }
`;

export default function Header() {
  return (
    <header>
      <Container inner={false}>
        <Div>
          <div className="left">
            <Logo />
            <ul className="nav">
              <li>
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="nav-link">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/hire-an-expert" className="nav-link">
                  Hire an Expert
                </NavLink>
              </li>
              <li>
                <NavLink to="/find-talent" className="nav-link">
                  Find Talent
                </NavLink>
              </li>
              <li>
                <NavLink to="/find-work" className="nav-link">
                  Find Work
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="right">
            <ul>
              <li>
                <Link to="/login" className="nav-link">
                  Log In
                </Link>
              </li>
              <li>
                <Button as={Link} to="/signup">
                  Sign Up
                </Button>
              </li>
            </ul>
          </div>
        </Div>
      </Container>
    </header>
  );
}
