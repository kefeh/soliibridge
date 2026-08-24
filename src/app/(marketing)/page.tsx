import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Partners from "@/components/home/Partners";
import LatestNews from "@/components/home/LatestNews";
import BottomCta from "@/components/home/BottomCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Partners />
      <LatestNews />
      <BottomCta />
    </>
  );
}
