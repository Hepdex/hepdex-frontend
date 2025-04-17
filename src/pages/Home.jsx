import Faqs from "../components/Faqs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Portfolio from "../components/Portfolio";
import Reviews from "../components/Reviews";
import Services from "../components/Services";
import WhyHepDex from "../components/WhyHepDex";
import Team from "../components/Team";
import Talent from "../components/Talent";

export default function Home() {
  return (
    <main>
      <Hero />
      <Portfolio />
      <Talent />
      <Team />
      <Services />
      <Reviews />
      <HowItWorks />
      <WhyHepDex />
      <Faqs />
      <Footer />
    </main>
  );
}
