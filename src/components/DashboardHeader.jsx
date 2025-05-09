import Logo from "./Logo";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { BsBell, BsList, BsQuestionCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { flex, mq } from "../GlobalStyles";
import { useDashboardContext } from "../context/DashboardContext";

// Dashboard header
const Header = styled.header`
  ${flex("space-between", "center")}
  position: fixed;
  top: 0;
  padding: 16px;
  z-index: 5;
  left: 0;
  width: 100%;
  max-height: 70px;
  background-color: var(--color-white-1);
  border-bottom: 1px solid #e5e7eb;
  // Icon
  svg {
    fill: #757575;
    transition: fill 0.4s ease-in-out;
  }
  // Nav button
  .nav-btn {
    background-color: transparent;
    width: 36px;
    height: 36px;
    ${flex("center", "center")}
    border-radius: 50%;
    transition: all 0.4s ease-in-out;
    &:hover {
      background-color: #f3f4f6;
      & > svg {
        fill: var(--color-black-1);
      }
    }
  }
  // Header left
  .left {
    ${flex(undefined, "center")}
    gap: 12px;
    // Main menu btn
    .main-menu__btn {
      display: none;
      ${mq(
        "md",
        css`
          display: inline-block;
        `
      )}
    }
    // Mobile menu btn
    .mobile-menu__btn {
      ${mq(
        "md",
        css`
          display: none;
        `
      )}
    }
    // logo
    .logo {
      display: none;
      ${mq(
        "md",
        css`
          display: block;
        `
      )}
    }
  }
  // Header center
  .center {
    ${mq(
      "md",
      css`
        display: none;
      `
    )}
  }
  // Header right
  .right {
    &-nav {
      ${flex(undefined, "center")}
      gap: 4px;
      & > li:not(:last-child) {
        display: none;
        ${mq(
          "md",
          css`
            display: inline-flex;
          `
        )}
      }
      // User box
      &__user {
        span {
          pointer-events: none;
        }
        button {
          ${flex("center", "center")}
          height: 40px;
          width: 40px;
          font-family: sans-serif;
          margin-left: 4px;
          font-weight: 600;
          font-size: 14px;
          background-color: var(--color-tertiary);
          border-radius: 50%;
        }
        // Dropdown
        ul.dropdown-menu {
          position: absolute;
          background-color: var(--color-white-1);
          top: calc(100% + 1px);
          right: 0;
          min-width: 200px;
          box-shadow: 0 7px 24px 0 #64646f33;
          padding: 0px 4px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          text-align: left;
          li {
            padding: 4px 0px;
            &:not(:last-child) {
              border-bottom: 1px solid #e5e7eb;
            }
            a {
              ${flex(undefined, "center")}
              padding: 8px 10px;
              border-radius: 4px;
              display: inline-flex;
              width: 100%;
              font-size: 15px;
              line-height: 20px;
              gap: 12px;
              &,
              & > svg {
                transition: none;
              }
              &:hover {
                color: var(--color-black-1);
                background-color: #f3f4f6;
                svg {
                  fill: var(--color-black-1);
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function DashboardHeader() {
  // Get dashboard context
  const { toggleNav, toggleMobileNav, isMobileNavOpen, setIsMobileNavOpen } =
    useDashboardContext();
  // Dropdown state
  const [open, setOpen] = useState(false);
  return (
    <Header>
      <div className="left">
        <button className="nav-btn main-menu__btn" onClick={toggleNav}>
          <BsList size={20} />
        </button>
        <button className="nav-btn mobile-menu__btn" onClick={toggleMobileNav}>
          <BsList size={20} />
        </button>
        <Logo url="/dashboard/home" />
      </div>
      <div className="center">
        <Logo
          url="/dashboard/home"
          onClick={() => {
            setIsMobileNavOpen(false);
          }}
        />
      </div>
      <div className="right">
        <ul className="right-nav">
          <li>
            <Link to="/dashboard/notifications" className="nav-btn">
              <BsBell size={20} />
            </Link>
          </li>
          <li>
            <Link to="/help" className="nav-btn">
              <BsQuestionCircle size={20} />
            </Link>
          </li>
          <li className="right-nav__user" id="user-menu">
            <button
              onClick={() => {
                if (isMobileNavOpen) toggleMobileNav();
                setOpen((s) => !s);
              }}
            >
              <span>CM</span>
            </button>
            {open && <DropdownMenu close={() => setOpen(false)} />}
          </li>
        </ul>
      </div>
    </Header>
  );
}

// Dropdown menu
function DropdownMenu({ close }) {
  useEffect(() => {
    // Listen handler
    const listen = (e) => {
      const menu = document.getElementById("user-menu");
      const element = e.target;
      if (menu?.contains(element)) return;
      else close();
    };
    // Listen for click event
    document.addEventListener("click", listen);
    return () => {
      // Remove event listener
      document.removeEventListener("click", listen);
    };
  }, [close]);

  return (
    <ul className="dropdown-menu">
      <li className="dropdown-menu__item">
        <Link
          className="dropdown-menu__item--link"
          to="/dashboard/notifications"
          onClick={close}
        >
          Notifications
        </Link>
      </li>
      <li className="dropdown-menu__item">
        <Link
          className="dropdown-menu__item--link"
          to="/dashboard/help"
          onClick={close}
        >
          Help centre
        </Link>
      </li>

      <li className="dropdown-menu__item">
        <Link
          className="dropdown-menu__item--link"
          to="/dashboard/settings"
          onClick={close}
        >
          Settings
        </Link>
      </li>
      <li className="dropdown-menu__item">
        <Link className="dropdown-menu__item--link">Log out</Link>
      </li>
    </ul>
  );
}
