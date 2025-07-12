import Section from "../../components/Section";
import Button from "../../components/Button";
import styled from "styled-components";
import InfoBox from "../../components/InfoBox";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

// Talent box
const TalentBox = styled(InfoBox)`
  flex-direction: column-reverse;
`;

export default function Talent() {
  // User context
  const { user, isLoggedIn } = useUserContext();

  return (
    <Section>
      <TalentBox>
        <div data-aos className="content-box custom-fade-right">
          <h1 className="heading-md">
            The #1 Global platform for remote workers.
          </h1>
          <p className="text-md">
            Whether you're hiring for a short-term gig or a long-term
            partnership, HepDex makes it simple to find talent that aligns
            perfectly with your goals.
          </p>
          <Button
            as={Link}
            to={`${
              user?.role === "employer" && isLoggedIn
                ? "/dashboard/browse-talent"
                : "/hire-expert"
            }`}
          >
            Find Talent
          </Button>
        </div>
        <div className="img-box custom-fade-left" data-aos>
          <img src="talent.jpg" alt="find-talent" />
        </div>
      </TalentBox>
    </Section>
  );
}
