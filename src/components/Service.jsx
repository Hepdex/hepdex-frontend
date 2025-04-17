import styled from "styled-components";
import Container from "./Container";
import { Link } from "react-router-dom";
import { flex } from "../GlobalStyles";
import { motion } from "framer-motion";

const Div = styled(Link)`
  transition: all 0.3s ease-in-out;
  ${flex(undefined, "center")}
  flex-direction: column;
  background-color: var(--color-grey-1);
  border-radius: 8px;
  padding: 48px 32px;
  &:hover {
    background-color: var(--color-secondary);
  }

  .icon {
    margin-bottom: 16px;
  }
  .name {
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 8px;
    text-align: center;
  }
  .text {
    color: var(--color-grey-2);
    transition: all 0.3s ease-in-out;
  }
  &:hover p.text {
    color: var(--color-black-1);
  }
  .browse {
    font-weight: 500;
    margin-top: 16px;
    font-size: 14px;
    border-bottom: 1px solid var(--color-black-1);
  }
`;
export default function Service({ service }) {
  return (
    <Container.Col breakPoints={[{ name: "md", cols: 3 }]}>
      <motion.div
        initial={{ opacity: 0, y: "40%" }}
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
        <Div to={"/services"}>
          <div className="icon">
            <img src={service.img} alt={service.name} />
          </div>
          <h3 className="name">{service.name}</h3>
          <p className="text">{service.text}</p>
          <span className="browse">Browse experts</span>
        </Div>
      </motion.div>
    </Container.Col>
  );
}
