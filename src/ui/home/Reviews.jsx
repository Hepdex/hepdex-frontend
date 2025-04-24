import { BsStarFill } from "react-icons/bs";
import styled, { css } from "styled-components";
import Section from "../../components/Section";
import { reviews } from "../../data/reviews";
import { flex, mq } from "../../GlobalStyles";
import Container from "../../components/Container";

const Div = styled.div`
  ul.reviews {
    ${flex("center")}
    row-gap: 32px;
    ${mq(
      "800px",
      css`
        justify-content: space-between;
      `
    )}
    .review {
      max-width: 520px;

      .text {
        font-size: 24px;
        line-height: 32px;
        font-weight: 500;
        margin-bottom: 16px;
      }
      .rating {
        ${flex(undefined, "center")}
        margin-bottom: 24px;
        column-gap: 8px;
      }
      .user {
        ${flex(undefined, "center")}
        column-gap: 12px;
        .details {
          ${flex()}
          flex-direction: column;
          .name {
            font-size: 14px;
            line-height: 28px;
          }
          .role {
            font-size: 12px;
            line-height: 12px;
            color: var(--color-grey-2);
          }
        }
      }
    }
  }
`;

export default function Reviews() {
  return (
    <Section
      title={`HepDex - The Trusted Partner for Remote Hiring!`}
      subtitle="Discover how Hepdex has helped businesses transform their operations with skilled remote talent - straight from our customers."
      marginBottom={true}
    >
      <Div>
        <Container.Row data-aos className="reviews custom-fade-up">
          {reviews.map((review, index) => (
            <Container.Col
              className="review"
              key={index}
              breakPoints={[{ name: "800px", cols: 2 }]}
            >
              <p className="text">“{review.text}”</p>
              <div className="rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <BsStarFill size={16} key={index} fill="#F99D15" />
                ))}
              </div>
              <div className="user">
                <div className="image">
                  <img src={review.img} alt={review.name} />
                </div>
                <div className="details">
                  <p className="name">-{review.name}</p>
                  <span className="role">{review.role}</span>
                </div>
              </div>
            </Container.Col>
          ))}
        </Container.Row>
      </Div>
    </Section>
  );
}
