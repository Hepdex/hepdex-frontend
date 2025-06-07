import Container from "./Container";
import Logo from "./Logo";
import Button from "./Button";
import Dropdown from "./Dropdown";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { NavLink, Link } from "react-router-dom";
import { BsList, BsXLg } from "react-icons/bs";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

// Header container
const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  top: 28px;
  z-index: 10;

  .header {
    // Header inner
    &-inner {
      ${flex("space-between", "center")}
      border-radius: 300px;
      position: relative;
      background-color: var(--color-white-1);
      box-shadow: 0 7px 24px 0 #64646f33;
      padding: 12px 24px;

      // Link styles
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

      // Nav box
      .nav-box {
        // Mobile auth navigation
        .auth-nav--mobile {
          display: none;
        }

        @media (max-width: 1033px) {
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

            // Media queries
            ${mq(
              "400px",
              css`
                max-width: 280px;
              `
            )}

            // Navigation menu
          .nav-box--list {
              flex-direction: column;
              align-items: start;

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
            }

            // Mobile auth navigation
            .auth-nav--mobile {
              ${flex(undefined, "start")}
              flex-direction: column;
              padding-bottom: 12px;
              gap: 8px;

              // Navigation link
              .nav-link {
                padding: 12px 0px;
              }

              li {
                .login-link {
                  border-top: 1px solid #eee;
                }

                &:first-child {
                  &,
                  & > a {
                    width: 100%;
                  }

                  &.account-link {
                    margin-top: 12px;

                    a {
                      width: auto;
                    }
                  }
                }
              }

              // Small screens
              ${mq(
                "sm",
                css`
                  display: none;
                `
              )}
            }
          }
        }

        // Large screens
        ${mq(
          "1034px",
          css`
            ${flex()}
          `
        )}
      }

      .nav-box--list,
      .mobile-menu {
        ${flex(undefined, "center")}
      }

      // Auth navigation
      .auth-nav {
        display: none;
        gap: 16px;

        // Small screens
        ${mq(
          "sm",
          css`
            ${flex(undefined, "center")}
          `
        )}
      }

      // Mobile menu
      .mobile-menu {
        gap: 16px;

        &--btn {
          ${flex("center", "center")}
          background-color: transparent;
          height: 48px;
          min-width: 24px;
          // Large screens
          ${mq(
            "1034px",
            css`
              display: none;
            `
          )}

          // icon
        svg {
            fill: #757575;
            pointer-events: none;
          }
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

  // User context
  const { user, isLoggedIn } = useUserContext();

  return (
    <StyledHeader className="header">
      <Container>
        <div className="header-inner">
          {/* Logo */}
          <Logo />
          <Dropdown close={close} menuId="header-nav" btnId="header-nav--btn">
            <div className={`nav-box ${open ? "open" : ""}`} id="header-nav">
              {/* Main navigation */}
              <ul className="nav-box--list">
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
                    to={`${
                      user?.role === "employer" && isLoggedIn
                        ? "/dashboard/browse-talent"
                        : "/login"
                    }`}
                    className="nav-link"
                    onClick={close}
                  >
                    Hire an Expert
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/find-work" className="nav-link" onClick={close}>
                    Find Work
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/share-requirement"
                    className="nav-link"
                    onClick={close}
                  >
                    Submit Requirements
                  </NavLink>
                </li>
              </ul>
              {/* Mobile auth navigation */}
              <AuthNav className="auth-nav--mobile" />
            </div>
          </Dropdown>
          <div className="mobile-menu" id="header-nav--btn">
            {/* Main auth navigation*/}
            <AuthNav className="auth-nav" close={close} />
            <button
              className="mobile-menu--btn"
              onClick={() => setIsOpen((s) => !s)}
            >
              {open ? <BsXLg size={18} /> : <BsList size={24} />}
            </button>
          </div>
        </div>
      </Container>
    </StyledHeader>
  );
}

// Auth navigation
const AuthNav = ({ className, close }) => {
  // Get user context
  const { user, isLoggedIn } = useUserContext();

  return (
    <ul className={className}>
      {user && isLoggedIn ? (
        <li className="account-link">
          <Button
            as={Link}
            to={`${
              user.role === "employer"
                ? "/dashboard/home"
                : user.role === "candidate"
                ? "/dashboard/find-jobs"
                : ""
            }`}
          >
            My Account
          </Button>
        </li>
      ) : (
        <>
          <li className="login-link">
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
