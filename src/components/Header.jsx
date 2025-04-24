import styled, { css } from "styled-components";
import Container from "./Container";
import Logo from "./logo";
import Button from "./button";
import { flex, mq } from "../GlobalStyles";
import { NavLink, Link } from "react-router-dom";
import { BsList, BsXLg } from "react-icons/bs";
import { useState } from "react";

const Div = styled.div`
  position: fixed;
  width: 100%;
  top: 28px;
  z-index: 10;
  & .inner {
    border-radius: 300px;
    position: relative;
    background-color: var(--color-white-1);
    box-shadow: 0 7px 24px 0 #64646f33;
    ${flex("space-between", "center")}
    padding: 12px 24px;
    .nav-box {
      @media (max-width: 992px) {
        display: none;
        // Open menu
        &.open {
          ${flex()}
          flex-direction: column;
          padding: 8px 16px;
          position: absolute;
          right: 0;
          top: calc(100% + 16px);
          border-radius: 8px;
          background-color: var(--color-white-1);
          max-width: 280px;
          width: 100%;
          box-shadow: 0 7px 24px 0 #64646f33;
          ${flex()}
          .nav {
            &,
            li,
            a {
              width: 100%;
            }
            li {
              a {
                padding: 12px 0px;
              }
              &:not(:last-child) {
                border-bottom: 1px solid #eee;
              }
            }
            flex-direction: column;
            align-items: start;
          }
          .mobile-auth {
            ${flex(undefined, "start")}
            flex-direction: column;
            padding-bottom: 12px;
            gap: 8px;
            border-top: 1px solid #eee;
            li:first-child {
              &,
              & > a {
                width: 100%;
              }
            }
            .nav-link {
              padding: 12px 0px;
            }
            ${mq(
              "sm",
              css`
                display: none;
              `
            )}
          }
        }
      }
      ${mq(
        "993px",
        css`
          ${flex()}
        `
      )}

      .mobile-auth {
        display: none;
      }
    }
    ul li a {
      padding: 8px 16px;
      transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
      display: inline-block;
      &.nav-link {
        &.active,
        &:hover {
          color: var(--color-primary);
        }
      }
    }
    .nav,
    .box {
      ${flex(undefined, "center")}
    }
    .auth-nav {
      display: none;
      gap: 16px;
      ${mq(
        "sm",
        css`
          ${flex(undefined, "center")}
        `
      )}
    }
    .box {
      gap: 16px;
      .mobile-btn {
        background-color: transparent;
        height: 48px;
        min-width: 24px;
        ${flex("center", "center")}
        ${mq(
          "lg",
          css`
            display: none;
          `
        )}
      }
    }
  }
`;

export default function Header() {
  // Menu state
  const [open, setIsOpen] = useState(false);
  // Close menu
  const close = () => setIsOpen(false);
  return (
    <Div>
      <Container>
        <div className="inner">
          <Logo />
          <div className={`nav-box ${open ? "open" : ""}`}>
            <ul className="nav">
              <li>
                <NavLink to="/home" className="nav-link" onClick={close}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="nav-link" onClick={close}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hire-an-expert"
                  className="nav-link"
                  onClick={close}
                >
                  Hire an Expert
                </NavLink>
              </li>
              <li>
                <NavLink to="/find-talent" className="nav-link" onClick={close}>
                  Find Talent
                </NavLink>
              </li>
              <li>
                <NavLink to="/find-work" className="nav-link" onClick={close}>
                  Find Work
                </NavLink>
              </li>
            </ul>
            <AuthMenu className="mobile-auth" />
          </div>
          <div className="box">
            <AuthMenu className="auth-nav" close={close} />
            <button className="mobile-btn" onClick={() => setIsOpen((s) => !s)}>
              {open ? <BsXLg size={18} /> : <BsList size={24} />}
            </button>
          </div>
        </div>
      </Container>
    </Div>
  );
}

const AuthMenu = ({ className, close }) => {
  return (
    <ul className={className}>
      <li>
        <Link to="/login" className="nav-link" onClick={close}>
          Log In
        </Link>
      </li>
      <li>
        <Button as={Link} to="/signup" onClick={close}>
          Sign Up
        </Button>
      </li>
    </ul>
  );
};
