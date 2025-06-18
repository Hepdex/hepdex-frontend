import Faqs from "../ui/home/Faqs";
import Hero from "../ui/home/Hero";
import HowItWorks from "../ui/home/HowItWorks";
import Portfolio from "../ui/home/Portfolio";
import Reviews from "../ui/home/Reviews";
import ExpertList from "../ui/home/ExpertList";
import WhyHepDex from "../ui/home/WhyHepDex";
import Team from "../ui/home/Team";
import Talent from "../ui/home/Talent";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle("The #1 Global platform for remote workers.");

  return (
    <>
      <Hero />
      <Portfolio />
      <Talent />
      <Team />
      <ExpertList />
      <Reviews />
      <HowItWorks />
      <WhyHepDex />
      <Faqs />
    </>
  );
}
