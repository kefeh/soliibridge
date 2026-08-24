import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInUp from "@/components/motion/FadeInUp";
import CatalogTabs from "@/components/officetrail/CatalogTabs";

export default function CatalogSection() {
  return (
    <section className="bg-cloud-gray py-24">
      <Container>
        <SectionHeading
          title="Our Catalog"
          subtitle="Browse printing, office supplies, and support services in one place."
        />
        <FadeInUp delay={0.1} className="mx-auto mt-14 max-w-4xl">
          <CatalogTabs />
        </FadeInUp>
      </Container>
    </section>
  );
}
