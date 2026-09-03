import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { aboutSeed } from "@/lib/cms-seed";

export default function OurStory() {
  const story = getContentBlock("cms:about:story", aboutSeed.story);

  return (
    <section className="bg-cloud-gray py-24">
      <Container className="mx-auto max-w-3xl text-center">
        <FadeInUp>
          <h2 className="font-display text-3xl font-bold text-slate-gray-dark sm:text-4xl">
            {story.heading}
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <p className="mt-6 text-lg leading-relaxed text-slate-gray">{story.body}</p>
        </FadeInUp>
      </Container>
    </section>
  );
}
