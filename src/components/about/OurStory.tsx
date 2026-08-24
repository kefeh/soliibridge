import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";

export default function OurStory() {
  return (
    <section className="bg-cloud-gray py-24">
      <Container className="mx-auto max-w-3xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-slate-gray-dark sm:text-4xl">
            Our Story
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <p className="mt-6 text-lg leading-relaxed text-slate-gray">
            Founded to bridge the gap between digital communication and essential
            office operations, SoliiBridge has grown into a comprehensive digital
            ecosystem. We started with a simple goal: to provide reliable tech
            solutions that empower businesses in Cameroon and beyond. Today, our
            dual platforms, ArcLocal and OfficeTrail HUB, serve thousands of users
            daily.
          </p>
        </FadeInUp>
      </Container>
    </section>
  );
}
