import Container from "../../components/Container";
import DashboardCard from "./DashboardCard";

// Candidate cards
const candidateCards = [
  {
    icon: "upload-resume.svg",
    title: "Upload Resume",
    text: "Unlock your next opportunity",
    features: [
      "Highlight your skills and experience",
      "Get matched with suitable roles",
      "Stay visible to top employers",
    ],
    btnText: "Upload resume",
    url: "/upload-resume",
  },
  {
    icon: "find-job.svg",
    title: "Find Jobs",
    text: "The right role is just a click away",
    features: [
      "Explore curated opportunities",
      "Filter by location, experience, or role",
      "Apply effortlessly with your resume",
    ],
    btnText: "Find jobs",
    url: "/dashboard/find-jobs",
  },
  {
    icon: "pro.svg",
    title: "Upgrade to Pro",
    text: "Stand out and grow your career",
    features: [
      "Build a trusted professional profile",
      "Showcase your expertise and achievements",
      "Priority access to top job opportunities",
    ],
    btnText: "Upgrade to pro",
    url: "/upgrade-to-pro",
  },
];

export default function CandidateDashboardContent() {
  return (
    <Container.Row>
      {candidateCards.map((card, index) => (
        <DashboardCard
          key={index}
          icon={card.icon}
          title={card.title}
          text={card.text}
          features={card.features}
          btnText={card.btnText}
          url={card.url}
        />
      ))}
    </Container.Row>
  );
}
