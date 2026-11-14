import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeInUp from "@/components/motion/FadeInUp";
import Accordion from "@/components/ui/Accordion";
import { getContentBlock } from "@/lib/db";
import { careersSeed } from "@/lib/cms-seed";
import { parseItems, vacancySections } from "@/lib/vacancies";

const TONES = ["green", "orange", "brand"] as const;

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
                  {vacancySections(vacancy)
                    .map((section) => ({ heading: section.heading.trim(), items: parseItems(section.items) }))
                    .filter((section) => section.items.length > 0)
                    .map((section, j) => (
                      <div
                        key={`${section.heading}-${j}`}
                        className="rounded-xl border border-border-gray bg-cloud-gray/60 p-5"
                      >
                        {section.heading && (
                          <h4 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-slate-gray-dark">
                            <span
                              aria-hidden
                              className="h-4 w-1 rounded-full bg-[var(--color-accent)]"
                            />
                            {section.heading}
                          </h4>
                        )}
                        <ul className={`flex flex-col gap-2 ${section.heading ? "mt-3" : ""}`}>
                          {section.items.map((item, k) => (
                            <li key={`${item}-${k}`} className="flex gap-3">
                              <span
                                aria-hidden
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
