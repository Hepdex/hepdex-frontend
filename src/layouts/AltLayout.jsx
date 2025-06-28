import Logo from "../components/Logo";
import Container from "../components/Container";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { flex } from "../GlobalStyles";

const StyledAltLayout = styled.main`
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

  // Navigate hook
  const navigate = useNavigate();

  // Location hook
  const location = useLocation();

  return (
    <StyledAltLayout>
      <Container mw="1400px">
        <div className="header">
          <Logo url={location.pathname} />
          <button
            onClick={() => navigate(-1, { replace: true })}
            className="close-page"
          >
            <BsXLg size={18} />
          </button>
        </div>
        <Outlet />
      </Container>
    </StyledAltLayout>
  );
}
