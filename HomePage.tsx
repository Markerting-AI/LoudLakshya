import Hero from "@/sections/Hero";
import ServicesOverview from "@/sections/ServicesOverview";
import PortfolioSlideshow from "@/sections/PortfolioSlideshow";
import WhyChooseUs from "@/sections/WhyChooseUs";
import Testimonials from "@/sections/Testimonials";
import CTABanner from "@/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <PortfolioSlideshow />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  );
}
