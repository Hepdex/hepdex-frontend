import Section from "../../components/Section";
import Button from "../../components/Button";
import InfoBox from "../../components/InfoBox";
import { Link } from "react-router-dom";

export default function Team() {
  return (
    <Section>
      <InfoBox>
        <div data-aos className="img-box custom-fade-right">
          <img src="team.jpg" alt="hire-team" />
        </div>
        <div className="content-box custom-fade-left" data-aos>
          <h1 className="heading-md">
            Bring your ideas to life with a dedicated team
          </h1>
          <p className="text-md">
            When your project calls for a diverse set of skills, you can hire a
            tailored team of experts who work together to deliver high-quality
            results.
          </p>
          <Button as={Link} to="/share-requirement">
            Hire a Team
          </Button>
        </div>
      </InfoBox>
    </Section>
  );
}
