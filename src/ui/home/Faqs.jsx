import styled from "styled-components";
import Container from "../../components/Container";
import Section from "../../components/Section";
import { faqs } from "../../data/faqs";

// Faqs box
const FaqsBox = styled.div`
  background-color: var(--color-grey-1);
  section {
    ul {
      row-gap: 32px;
      .faq {
        .question {
          font-size: 22px;
          line-height: 32px;
          margin-bottom: 8px;
        }
        .answer {
          color: var(--color-grey-2);
        }
      }
    }
  }
`;

export default function Faqs() {
  return (
    <FaqsBox>
      <Section
        title="Frequently asked questions"
        marginBottom={true}
        subtitle="We've heard it all. Here’s what you need to know."
      >
        <div data-aos className="custom-fade-up">
          <Container.Row>
            {faqs.map((faq, index) => (
              <Container.Col
                key={index}
                breakPoints={[
                  { name: "sm", cols: 2 },
                  { name: "xl", cols: 3 },
                ]}
              >
                <div className="faq">
                  <h3 className="question">{faq.question}</h3>
                  <p className="answer">{faq.answer}</p>
                </div>
              </Container.Col>
            ))}
          </Container.Row>
        </div>
      </Section>
    </FaqsBox>
  );
}
