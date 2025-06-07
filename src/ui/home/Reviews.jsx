import Container from "../../components/Container";
import Review from "../../components/Review";
import Section from "../../components/Section";
import styled, { css } from "styled-components";
import { reviews } from "../../data/reviews";
import { flex, mq } from "../../GlobalStyles";

// Reviews container
const StyledReviews = styled.div`
  .reviews {
    ${flex("center")}
    row-gap: 32px;

    // Media queries
    ${mq(
      "800px",
      css`
        justify-content: space-between;
      `
    )}
  }
`;

export default function Reviews() {
  return (
    <Section
      title={`HepDex - The Trusted Partner for Remote Hiring!`}
      subtitle="Discover how Hepdex has helped businesses transform their operations with skilled remote talent - straight from our customers."
      spaceBottom={true}
    >
      <StyledReviews>
        <Container.Row data-aos className="reviews custom-fade-up">
          {reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </Container.Row>
      </StyledReviews>
    </Section>
  );
}
