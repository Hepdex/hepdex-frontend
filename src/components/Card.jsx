import styled from "styled-components";

// Card container
const StyledCard = styled.div`
  background-color: var(--color-white-1);
  padding: 28px 24px;
  border-radius: 8px;

  .card {
    // Title
    &--title {
      font-size: 18px;
      line-height: 24px;
      font-weight: 500;
      margin-bottom: 12px;
    }
  }
`;

export default function Card({ title, children, className }) {
  return (
    <StyledCard className={`card ${className}`}>
      {title && <h3 className="card--title">{title}</h3>}
      {children}
    </StyledCard>
  );
}
