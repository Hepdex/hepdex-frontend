import styled from "styled-components";
import Section from "../../components/Section";
import Stat from "../../components/Stat";
import { flex } from "../../GlobalStyles";
import { BsBriefcase, BsCheck2Circle, BsPerson } from "react-icons/bs";

// Stats list
const StatsList = styled.ul`
  ${flex("center", "center")}
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
  gap: 30px;
`;

export default function Stats() {
  return (
    <Section
      title="Utilize top Services"
      subtitle="We deliver the quality and precision your business deserves."
    >
      <StatsList className="custom-fade-up" data-aos>
        <Stat
          text="Active Jobs"
          value={"10K+"}
          icon={<BsBriefcase size={32} />}
        />
        <Stat
          text="Registered Users"
          value={"50K+"}
          icon={<BsPerson size={32} />}
        />
        <Stat
          text="Success Rate"
          value={"95%"}
          icon={<BsCheck2Circle size={32} />}
        />
      </StatsList>
    </Section>
  );
}
