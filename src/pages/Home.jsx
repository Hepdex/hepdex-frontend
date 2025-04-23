import Faqs from "../ui/home/Faqs";
import Hero from "../ui/home/Hero";
import HowItWorks from "../ui/home/HowItWorks";
import Portfolio from "../ui/home/Portfolio";
import Reviews from "../ui/home/Reviews";
import ServiceList from "../ui/home/ServiceList";
import WhyHepDex from "../ui/home/WhyHepDex";
import Team from "../ui/home/Team";
import Talent from "../ui/home/Talent";

export default function Home() {
  return (
    <div>
      <Hero />
      <Portfolio />
      <Talent />
      <Team />
      <ServiceList />
      <Reviews />
      <HowItWorks />
      <WhyHepDex />
      <Faqs />
    </div>
  );
}
