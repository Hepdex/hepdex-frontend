import styled from "styled-components";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Faq from "../../components/Faq";
import { faqs } from "../../data/faqs";

// Faqs container
const StyledFaqs = styled.div`
  background-color: var(--color-grey-1);

  section ul {
    row-gap: 32px;
  }
`;

export default function Faqs() {
  return (
    <StyledFaqs>
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
    </StyledFaqs>
  );
}
