import styled from "styled-components";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Faq from "../components/Faq";
import Container from "../components/Container";
import GetStarted from "../ui/services/GetStarted";
import { faqs } from "../data/faqs";

const StyledFaqs = styled.div`
  section ul {
    row-gap: 32px;
  }
`;

export default function Faqs() {
  // Document title
  useDocumentTitle("FAQs");

  return (
    <StyledFaqs>
      <PageContent>
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
      </PageContent>
      <GetStarted />
    </StyledFaqs>
  );
}
