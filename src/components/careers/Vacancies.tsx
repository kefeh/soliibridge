import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeInUp from "@/components/motion/FadeInUp";
import Accordion from "@/components/ui/Accordion";
import { getContentBlock } from "@/lib/db";
import { careersSeed } from "@/lib/cms-seed";

const TONES = ["green", "orange", "blue"] as const;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Vacancies() {
  const vacancies = getContentBlock("cms:careers:vacancies", careersSeed.vacancies);

  return (
    <section className="py-24">
      <Container className="mx-auto max-w-3xl">
        <SectionHeading title="Current Vacancies" />
        <FadeInUp delay={0.1} className="mt-14">
          <Accordion
            items={vacancies.map((vacancy, i) => ({
              id: `${slugify(vacancy.title)}-${i}`,
              title: vacancy.title,
              content: (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone={TONES[i % TONES.length]}>{vacancy.location}</Badge>
                  </div>
                  <p>{vacancy.description}</p>
                  <div>
                    <p className="font-semibold text-slate-gray-dark">Requirements</p>
                    <ul className="mt-2 flex flex-col gap-1.5 list-disc pl-5">
                      {vacancy.requirements
                        .split("\n")
                        .map((req) => req.trim())
                        .filter(Boolean)
                        .map((req) => (
                          <li key={req}>{req}</li>
                        ))}
                    </ul>
                  </div>
                  <Button href="#apply" variant="primary" tone="accent" className="self-start">
                    Apply for this Role
                  </Button>
                </div>
              ),
            }))}
          />
        </FadeInUp>
      </Container>
    </section>
  );
}
