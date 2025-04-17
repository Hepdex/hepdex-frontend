import Section from "./Section";
import Button from "./button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <Section>
      <div className="info-box">
        <motion.div
          className="team-img"
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img src="team.jpg" alt="hire-team" />
        </motion.div>
        <motion.div
          className="content"
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <h1 className="heading-md">
            Bring your ideas to life with a dedicated team
          </h1>
          <p className="text-md">
            When your project calls for a diverse set of skills, you can hire a
            tailored team of experts who work together to deliver high-quality
            results.
          </p>
          <Button as={Link} to="/share-requirements">
            Hire a Team
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
