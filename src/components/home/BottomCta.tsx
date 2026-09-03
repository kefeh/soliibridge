import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { homeSeed } from "@/lib/cms-seed";

export default function BottomCta() {
  const bottomCta = getContentBlock("cms:home:bottomCta", homeSeed.bottomCta);

  return (
    <section className="bg-corporate-blue py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {bottomCta.headline}
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <Button href="/contact" variant="primary" tone="white">
            {bottomCta.buttonLabel}
          </Button>
        </FadeInUp>
      </Container>
    </section>
  );
}
