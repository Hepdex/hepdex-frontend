import Container from "./Container";
import Section from "./Section";
import styled from "styled-components";
import { faqs } from "../data/faqs";
import { motion } from "framer-motion";

const Main = styled.div`
  background-color: var(--color-grey-1);
  padding: 96px 0px;
  section {
    margin-top: 0px;
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
    <Main>
      <Section
        title="Frequently asked questions"
        subtitle="We've heard it all. Here’s what you need to know."
      >
        <Container.Row>
          {faqs.map((faq, index) => (
            <Container.Col key={index} breakPoints={[{ name: "md", cols: 3 }]}>
              <motion.div
                className="faq"
                initial={{ opacity: 0, y: "50%" }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeIn",
                }}
              >
                <h3 className="question">{faq.question}</h3>
                <p className="answer">{faq.answer}</p>
              </motion.div>
            </Container.Col>
          ))}
        </Container.Row>
      </Section>
    </Main>
  );
}
