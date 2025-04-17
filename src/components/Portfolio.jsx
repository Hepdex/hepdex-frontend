import styled from "styled-components";
import Container from "./Container";
import { motion } from "framer-motion";
import { flex } from "../GlobalStyles";

const Div = styled.div`
  background-color: var(--color-grey-1);
  padding: 40px 0px;

  .portfolio {
    ${flex("center")}
    flex-direction: column;
    row-gap: 16px;
    p {
      text-align: center;
      color: var(--color-grey-2);
    }
    ul.logos {
      ${flex("center", "center")}
      flex-wrap: wrap;
      column-gap: 64px;
      row-gap: 24px;
    }
  }
`;

export default function Portfolio() {
  return (
    <Div>
      <Container>
        <div className="portfolio">
          <p>Trusted by 500+ companies and startups worldwide</p>
          <ul className="logos">
            <motion.li
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.1,
                ease: "easeIn",
              }}
              viewport={{
                once: true,
              }}
            >
              <img alt="netflix" src="logos/netflix.svg" />
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.2,
                ease: "easeIn",
              }}
            >
              <img alt="facebook" src="logos/facebook.svg" />
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.35,
                ease: "easeIn",
              }}
            >
              <img alt="apple-music" src="logos/apple.svg" />
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                ease: "easeIn",
              }}
            >
              <img alt="gitlab" src="logos/gitlab.svg" />
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                ease: "easeIn",
              }}
            >
              <img alt="soundcloud" src="logos/soundcloud.svg" />
            </motion.li>
          </ul>
        </div>
      </Container>
    </Div>
  );
}
