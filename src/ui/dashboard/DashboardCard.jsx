import Container from "../../components/Container";
import Button from "../../components/Button";
import BoxIcon from "../../components/BoxIcon";
import styled, { css } from "styled-components";
import { BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { flex, mq } from "../../GlobalStyles";

// Dashboard card container
const StyledDashboardCard = styled.div`
  height: 100%;
  background-color: var(--color-white-1);
  border-radius: 8px;
  padding: 24px 20px;

  // Small screens
  ${mq(
    "sm",
    css`
      padding: 28px 24px;
    `
  )}

  .dashboard-card {
    // Icon
    &__icon {
      margin-bottom: 18px;
    }

    // Title
    &__title {
      font-size: 18px;
      line-height: 24px;
      font-weight: 500;
    }

    // Text
    &__text {
      margin-top: 4px;
      color: var(--color-grey-2);
    }

    // Features
    &__features {
      ${flex("center", "start")}
      background-color: var(--color-grey-1);
      padding: 16px 12px;
      margin: 12px 0px 18px 0px;
      border-radius: 8px;
      flex-direction: column;
      gap: 12px;

      li {
        ${flex(undefined, "start")}
        font-size: 15px;
        line-height: 20px;
        gap: 8px;

        // Feature icon
        .feature-icon {
          ${flex("center", "center")}
          height: 16px;
          padding: 1px 0px;
          margin-top: 2px;
          border-radius: 50%;
          min-width: 16px;
          background-color: #aee5c2;

          svg {
            fill: #12b749;
          }
        }
      }
    }
  }
`;

// Dashboard card
export default function DashboardCard({
  icon,
  title,
  text,
  features,
  btnText,
  url = "",
}) {
  return (
    <Container.Col
      breakPoints={[
        { name: "1024px", cols: 2 },
        { name: "1440px", cols: 3 },
      ]}
    >
      <StyledDashboardCard className="dashboard-card">
        {icon && <BoxIcon className="dashboard-card__icon">{icon}</BoxIcon>}

        {title && <h3 className="dashboard-card__title">{title}</h3>}
        {text && <p className="dashboard-card__text">{text}</p>}
        {features && (
          <ul className="dashboard-card__features">
            {features.map((item, index) => (
              <li key={index}>
                <span className="feature-icon">
                  <BsCheck size={16} />
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        )}
        {btnText && (
          <Button as={Link} size="sm" to={url}>
            {btnText}
          </Button>
        )}
      </StyledDashboardCard>
    </Container.Col>
  );
}
