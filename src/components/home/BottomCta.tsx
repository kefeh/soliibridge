import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeInUp from "@/components/motion/FadeInUp";

export default function BottomCta() {
  return (
    <section className="bg-corporate-blue py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to grow your organization?
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <Button href="/contact" variant="primary" tone="white">
            Request Quote
          </Button>
        </FadeInUp>
      </Container>
    </section>
  );
}
