import Container from "./Container";
import Section from "./Section";
import Service from "./Service";
import styled from "styled-components";
import { services } from "../data/services";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Div = styled.div`
  margin-top: 32px;
  text-align: center;
  a {
    color: var(--color-primary);
  }
`;

export default function Services() {
  return (
    <Section
      title="Leverage top services"
      subtitle="We deliver the quality and precision your business deserves."
    >
      <Container.Row>
        {services.map((service, index) => (
          <Service key={index} service={service} />
        ))}
      </Container.Row>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.4,
          ease: "easeIn",
        }}
      >
        <Div>
          <Link>View all services</Link>
        </Div>
      </motion.div>
    </Section>
  );
}
