import {
  BsArchive,
  BsArchiveFill,
  BsBookmarkCheckFill,
  BsBookmarkFill,
  BsBookmarkHeart,
  BsBookmarkHeartFill,
  BsBriefcaseFill,
  BsGearFill,
  BsHouseDoorFill,
  BsPersonFill,
  BsPieChartFill,
  BsPinAngleFill,
  BsShareFill,
  BsStarFill,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { useDashboardContext } from "../context/DashboardContext";
import { useUserContext } from "../context/UserContext";
import Dropdown from "./Dropdown";
import Overlay from "./Overlay";

// Employer menu
const employerMenu = [
  {
    text: "Dashboard",
    icon: <BsPieChartFill />,
    link: "/dashboard/home",
  },
  {
    text: "Jobs",
    icon: <BsBriefcaseFill />,
    link: "/dashboard/jobs",
  },
  {
    text: "Sourcing",
    icon: <BsShareFill />,
    link: "/dashboard/browse-talent",
  },
  {
    text: "Company",
    icon: <BsHouseDoorFill />,
    link: "/dashboard/company-bio",
  },
];

// Candidate menu
const candidateMenu = [
  {
    text: "Find jobs",
    icon: <BsBriefcaseFill />,
    link: "/dashboard/find-jobs",
  },
  {
    text: "Saved jobs",
    icon: <BsStarFill />,
    link: "/dashboard/saved-jobs",
  },
  {
    text: "Profile",
    icon: <BsPersonFill />,
    link: "/dashboard/candidate-bio",
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

    // Medium screens
    ${mq(
      "md",
      css`
        left: 0;
        max-width: 68px;
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
          ${flex(undefined, "center")}
          padding: 10px;
          gap: 12px;
          border-radius: 8px;
          min-width: 44px;
          transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;

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
            width: 20px;
            height: 20px;
            min-width: 24px;
            transition: fill 0.4s ease-in-out;
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
  const { user } = useUserContext();

  // Get dashboard context
  const { isNavOpen, isMobileNavOpen, setIsMobileNavOpen } =
    useDashboardContext();

  // Close
  const close = () => setIsMobileNavOpen(false);

  return (
    <Sidebar $isNavOpen={isNavOpen} $isMobileNavOpen={isMobileNavOpen}>
      <Dropdown close={close} btnId="side-nav__btn" menuId="dashboard-sidebar">
        <aside id="dashboard-sidebar">
          <ul className="sidebar-nav">
            {user.role === "employer" &&
              employerMenu.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.link} onClick={close}>
                    {item.icon}
                    <span className="link-text">{item.text}</span>
                  </NavLink>
                </li>
              ))}
            {user.role === "candidate" &&
              candidateMenu.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.link} onClick={close}>
                    {item.icon}
                    <span className="link-text">{item.text}</span>
                  </NavLink>
                </li>
              ))}
            <li>
              <NavLink to="/dashboard/settings" onClick={close}>
                <BsGearFill />
                <span className="link-text">Settings</span>
              </NavLink>
            </li>
          </ul>
        </aside>
      </Dropdown>
      <Overlay className="overlay" />
    </Sidebar>
  );
}
