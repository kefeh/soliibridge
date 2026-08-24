import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Vacancies from "@/components/careers/Vacancies";
import ApplicationForm from "@/components/careers/ApplicationForm";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Careers | SoliiBridge",
  description:
    "Discover opportunities to grow your career with SoliiBridge across ArcLocal and OfficeTrail HUB.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join the SoliiBridge Ecosystem"
        subtitle="We are building the future of digital communications and office solutions. Discover opportunities to grow your career with us."
      />
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
