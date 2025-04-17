import Section from "./Section";
import Button from "./button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Talent() {
  return (
    <Section>
      <div className="info-box">
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          viewport={{ once: true, amount: 0.25 }}
          className="content"
        >
          <h1 className="heading-md"> HepDex helps you find talent your way</h1>
          <p className="text-md">
            Whether you're hiring for a short-term gig or a long-term
            partnership, HepDex makes it simple to find talent that aligns
            perfectly with your goals.
          </p>
          <Button as={Link} to="/find-talent">
            Find Talent
          </Button>
        </motion.div>
        <motion.div
          className="talent-img"
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img src="talent.jpg" alt="find-talent" />
        </motion.div>
      </div>
    </Section>
  );
}
