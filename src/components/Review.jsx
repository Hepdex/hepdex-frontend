import styled from "styled-components";
import Container from "./Container";
import { flex } from "../GlobalStyles";
import { BsStarFill } from "react-icons/bs";

// Review styles
const StyledReview = styled.div`
  max-width: 520px;

  .review {
    &-text {
      font-size: 24px;
      line-height: 32px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    &-rating {
      ${flex(undefined, "center")}
      margin-bottom: 24px;
      column-gap: 8px;
    }

    &-user {
      ${flex(undefined, "center")}
      column-gap: 12px;

      &--image {
        width: 56px;
        height: 56px;
        overflow: hidden;
        border-radius: 50%;
      }

      &--details {
        ${flex()}
        flex-direction: column;

        &__name {
          font-size: 14px;
          line-height: 28px;
        }

        &__role {
          font-size: 12px;
          line-height: 12px;
          color: var(--color-grey-2);
        }
      }
    }
  }
`;

export default function Review({ review }) {
  return (
    <Container.Col breakPoints={[{ name: "800px", cols: 2 }]}>
      <StyledReview className="review">
        <p className="review-text">“{review.text}”</p>
        <div className="review-rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <BsStarFill size={16} key={index} fill="#F99D15" />
          ))}
        </div>
        <div className="review-user">
          <div className="review-user--image">
            <img src={review.img} alt={review.name} />
          </div>
          <div className="review-user--details">
            <p className="review-user--details__name">-{review.name}</p>
            <span className="review-user--details__role">{review.role}</span>
          </div>
        </div>
      </StyledReview>
    </Container.Col>
  );
}
