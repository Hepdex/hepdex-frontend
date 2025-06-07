import styled from "styled-components";
import Container from "./Container";

// Faq styles
const StyledFaq = styled.div`
  .faq {
    &-question {
      font-size: 22px;
      line-height: 32px;
      margin-bottom: 8px;
    }

    &-answer {
      color: var(--color-grey-2);
    }
  }
`;

export default function Faq({ faq }) {
  return (
    <Container.Col
      breakPoints={[
        { name: "sm", cols: 2 },
        { name: "xl", cols: 3 },
      ]}
    >
      <StyledFaq className="faq">
        <h3 className="faq-question">{faq.question}</h3>
        <p className="faq-answer">{faq.answer}</p>
      </StyledFaq>
    </Container.Col>
  );
}
