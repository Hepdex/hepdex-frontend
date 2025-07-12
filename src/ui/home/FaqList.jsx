import styled from "styled-components";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Faq from "../../components/Faq";
import { faqs } from "../../data/faqs";

// Faq list container
const StyledFaqList = styled.div`
  background-color: var(--color-grey-1);

  section ul {
    row-gap: 32px;
  }
`;

export default function FaqList() {
  return (
    <StyledFaqList>
      <Section
        title="Frequently asked questions"
        spaceBottom={true}
        subtitle="We've heard it all. Here’s what you need to know."
      >
        <Container.Row data-aos className="custom-fade-up">
          {faqs.map((faq, index) => (
            <Faq key={index} faq={faq} />
          ))}
        </Container.Row>
      </Section>
    </StyledFaqList>
  );
}
