import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { NavLink, Link } from "react-router-dom";
import { BsList, BsXLg } from "react-icons/bs";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import Dropdown from "./Dropdown";

// Header box
const HeaderBox = styled.div`
  position: fixed;
  width: 100%;
  top: 28px;
  z-index: 10;
  // Inner
  & .inner {
    border-radius: 300px;
    position: relative;
    background-color: var(--color-white-1);
    box-shadow: 0 7px 24px 0 #64646f33;
    ${flex("space-between", "center")}
    padding: 12px 24px;
    // Nav box
    .nav-box {
      .auth-menu__mobile {
        display: none;
      }
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
          width: 100%;
          box-shadow: 0 7px 24px 0 #64646f33;
          ${mq(
            "400px",
            css`
              max-width: 280px;
            `
          )}
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
          .auth-menu__mobile {
            ${flex(undefined, "start")}
            flex-direction: column;
            padding-bottom: 12px;
            gap: 8px;
            li {
              .login-item {
                border-top: 1px solid #eee;
              }
              &:first-child {
                &,
                & > a {
                  width: 100%;
                }
                &.account-item {
                  margin-top: 12px;
                  a {
                    width: auto;
                  }
                }
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
    .mobile-menu__box {
      ${flex(undefined, "center")}
    }
    .auth-menu {
      display: none;
      gap: 16px;
      ${mq(
        "sm",
        css`
          ${flex(undefined, "center")}
        `
      )}
    }
    .mobile-menu__box {
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
        svg {
          fill: #757575;
          pointer-events: none;
        }
      }
    }
  }
`;

export default function Header() {
  // Open menu state
  const [open, setIsOpen] = useState(false);
  // Close menu
  const close = () => setIsOpen(false);
  return (
    <HeaderBox>
      <Container>
        <div className="inner">
          <Logo />
          <Dropdown close={close} menuId="header-nav" btnId="mobile-box">
            <div className={`nav-box ${open ? "open" : ""}`} id="header-nav">
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
                  <NavLink
                    to="/find-talent"
                    className="nav-link"
                    onClick={close}
                  >
                    Find Talent
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/find-work" className="nav-link" onClick={close}>
                    Find Work
                  </NavLink>
                </li>
              </ul>
              <AuthMenu className="auth-menu__mobile" />
            </div>
          </Dropdown>
          <div className="mobile-menu__box" id="mobile-box">
            <AuthMenu className="auth-menu" close={close} />
            <button className="mobile-btn" onClick={() => setIsOpen((s) => !s)}>
              {open ? <BsXLg size={18} /> : <BsList size={24} />}
            </button>
          </div>
        </div>
      </Container>
    </HeaderBox>
  );
}

// Auth menu
const AuthMenu = ({ className, close }) => {
  // Get user context
  const { user, isLoggedIn } = useUserContext();
  return (
    <ul className={className}>
      {user && isLoggedIn ? (
        <li className="account-item">
          <Button
            as={Link}
            to={`${
              user.role === "employer"
                ? "/dashboard/home"
                : user.role === "candidate"
                ? "/dashboard/browse-jobs"
                : ""
            }`}
          >
            My Account
          </Button>
        </li>
      ) : (
        <>
          <li className="login-item">
            <Link to="/login" className="nav-link" onClick={close}>
              Log In
            </Link>
          </li>
          <li>
            <Button as={Link} to="/signup" onClick={close}>
              Sign Up
            </Button>
          </li>
        </>
      )}
    </ul>
  );
};
