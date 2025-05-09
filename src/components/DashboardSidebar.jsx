import styled, { css } from "styled-components";
import {
  BsBriefcaseFill,
  BsClipboardCheckFill,
  BsGearFill,
  BsPieChartFill,
  BsShareFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { flex, mq } from "../GlobalStyles";
import { useDashboardContext } from "../context/DashboardContext";

// Employer menu
const employerMenu = [
  {
    text: "Jobs",
    icon: <BsBriefcaseFill />,
    link: "/dashboard/jobs",
  },
  {
    text: "Sourcing",
    icon: <BsShareFill />,
    link: "/dashboard/talent",
  },
];

// Candidate menu
const candidateMenu = [
  {
    text: "Jobs",
    icon: <BsBriefcaseFill />,
    link: "/dashboard/browse-jobs",
  },
  {
    text: "Applications",
    icon: <BsClipboardCheckFill />,
    link: "/dashboard/talent",
  },
];

// Sidebar
const Sidebar = styled.div`
  aside {
    background-color: var(--color-white-1);
    width: 100%;
    position: fixed;
    top: 70px;
    height: 100%;
    left: -100%;
    border-right: 1px solid #e5e7eb;
    padding: 32px 12px 12px 12px;
    z-index: 5;
    ${mq(
      "md",
      css`
        left: 0;
        max-width: 72px;
        height: calc(100% - 70px);
      `
    )}
    // Navigation
  ul.sidebar-nav {
      ${flex(undefined, "stretch")}
      flex-direction: column;
      gap: 8px;
      li {
        a {
          padding: 10px;
          gap: 12px;
          border-radius: 8px;
          transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
          ${flex(undefined, "center")}
          .link-text {
            line-height: 16px;
            ${mq(
              "md",
              css`
                display: none;
              `
            )}
          }
          svg {
            fill: #757575;
            width: 24px;
            height: 24px;
            min-width: 24px;
            transition: fill 0.4s ease-in-out;
          }
          &.active {
            font-weight: 500;
          }
          &.active,
          &:hover {
            background-color: var(--color-secondary);
            svg {
              fill: var(--color-primary);
            }
          }
        }
      }
    }
  }
  // Overlay
  .overlay {
    z-index: 4;
    display: none;
  }
  // Open mobile nav
  ${(props) =>
    props.$isMobileNavOpen &&
    css`
      aside {
        left: 0;
        max-width: 250px;
      }
      .overlay {
        display: block;
        ${mq(
          "md",
          css`
            display: none;
          `
        )}
      }
    `}
  // Open nav
  ${(props) =>
    props.$isNavOpen &&
    css`
      aside {
        ${mq(
          "md",
          css`
            max-width: 250px;
            // Navigation
            ul.sidebar-nav {
              li a {
                .link-text {
                  display: inline-flex;
                }
              }
            }
          `
        )}
      }
    `}
`;

export default function DashboardSideBar() {
  // User role
  const role = "employer";
  // Get dashboard context
  const { isNavOpen, isMobileNavOpen, setIsMobileNavOpen } =
    useDashboardContext();
  return (
    <Sidebar $isNavOpen={isNavOpen} $isMobileNavOpen={isMobileNavOpen}>
      <aside>
        <ul className="sidebar-nav">
          <li>
            <NavLink
              to="/dashboard/home"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <BsPieChartFill />
              <span className="link-text">Dashboard</span>
            </NavLink>
          </li>
          {role === "employer" &&
            employerMenu.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.icon}
                  <span className="link-text">{item.text}</span>
                </NavLink>
              </li>
            ))}
          {role === "candidate" &&
            candidateMenu.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.icon}
                  <span className="link-text">{item.text}</span>
                </NavLink>
              </li>
            ))}
          <li>
            <NavLink
              to="/dashboard/settings"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <BsGearFill />
              <span className="link-text">Settings</span>
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="overlay" onClick={() => setIsMobileNavOpen(false)} />
    </Sidebar>
  );
}
