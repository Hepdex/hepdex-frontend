import Logo from "../components/Logo";
import Container from "../components/Container";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { flex } from "../GlobalStyles";
import { useUserContext } from "../context/UserContext";

export const StyledAltLayout = styled.main`
  background-color: #f3f4f6;
  min-height: 100dvh;
  // Header
  .header {
    ${flex("space-between", "center")}
    padding-top: 24px;

    .close-page {
      ${flex("center", "center")}
      min-height: 36px;
      background-color: transparent;

      svg {
        fill: var(--color-grey-2);
      }
    }
  }
`;

export default function AltLayout() {
  // User context
  const { user } = useUserContext();

  // Navigate hook
  const navigate = useNavigate();

  // Location hook
  const location = useLocation();

  return user || location.pathname.startsWith("/jobs/") ? (
    <StyledAltLayout>
      <Container mw="1400px">
        <div className="header">
          <Logo url={window.history.length > 2 ? "" : "/home"} />
          <button
            onClick={() =>
              window.history.length > 2
                ? navigate(-1)
                : navigate("/home", { replace: true })
            }
            className="close-page"
          >
            <BsXLg size={18} />
          </button>
        </div>
        <Outlet />
      </Container>
    </StyledAltLayout>
  ) : (
    <Navigate
      to={
        user?.role === "employer"
          ? "/dashboard/home"
          : user?.role === "candidate"
          ? "/dashboard/find-jobs"
          : "/home"
      }
      replace
    />
  );
}
