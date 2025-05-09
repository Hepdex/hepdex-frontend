import Section from "../../components/Section";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function Talent() {
  return (
    <Section>
      <div className="info-box" id="talent">
        <div data-aos className="content custom-fade-right">
          <h1 className="heading-md">
            The #1 Global platform for remote workers.
          </h1>
          <p className="text-md">
            Whether you're hiring for a short-term gig or a long-term
            partnership, HepDex makes it simple to find talent that aligns
            perfectly with your goals.
          </p>
          <Button as={Link} to="/find-talent">
            Find Talent
          </Button>
        </div>
        <div data-aos className="img-box custom-fade-left">
          <img src="talent.jpg" alt="find-talent" />
        </div>
      </div>
    </Section>
  );
}
