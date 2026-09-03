import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Vacancies from "@/components/careers/Vacancies";
import ApplicationForm from "@/components/careers/ApplicationForm";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getContentBlock } from "@/lib/db";
import { careersSeed } from "@/lib/cms-seed";

export const metadata: Metadata = {
  title: "Careers | SoliiBridge",
  description:
    "Discover opportunities to grow your career with SoliiBridge across ArcLocal and OfficeTrail HUB.",
};

export const dynamic = "force-dynamic";

export default function CareersPage() {
  const hero = getContentBlock("cms:careers:hero", careersSeed.hero);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.headline} subtitle={hero.subheading} />
      <Vacancies />
      <section id="apply" className="bg-cloud-gray py-24">
        <Container>
          <SectionHeading
            title="Apply Online"
            subtitle="Send us your details and resume — we review every application."
          />
          <div className="mt-14">
            <ApplicationForm />
          </div>
        </Container>
      </section>
    </>
  );
}
