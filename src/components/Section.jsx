import styled, { css } from "styled-components";
import Container from "./Container";
import { flex } from "../GlobalStyles";
import { motion } from "framer-motion";

const SectionDiv = styled.section`
  margin-top: 96px;
  & .title {
    text-align: center;
    ${flex("center")}
    flex-direction: column;
    margin-bottom: 56px;
    row-gap: 8px;
    p {
      color: var(--color-grey-2);
    }
  }
  // Set margin
  ${(props) =>
    props.$marginBottom &&
    css`
      margin-bottom: 96px;
    `}
`;

export default function Section({ title, subtitle, children, marginBottom }) {
  return (
    <SectionDiv $marginBottom={marginBottom}>
      <Container>
        {title && (
          <motion.div
            className="title"
            initial={{
              opacity: 0,
              y: "100%",
            }}
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
            <h1 className="heading-md">{title}</h1>
            {subtitle && <p className="text-md">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </Container>
    </SectionDiv>
  );
}
