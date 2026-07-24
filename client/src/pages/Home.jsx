import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedJobs from "../components/FeaturedJobs";
import TopCompanies from "../components/TopCompanies";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedJobs />
      <TopCompanies />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;