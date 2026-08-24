import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import ServiceCategories from "@/components/officetrail/ServiceCategories";
import CatalogSection from "@/components/officetrail/CatalogSection";
import PortalTeaser from "@/components/officetrail/PortalTeaser";
import BottomCta from "@/components/home/BottomCta";

export const metadata: Metadata = {
  title: "OfficeTrail HUB | Documentation, Printing & Branding | SoliiBridge",
  description:
    "Equipping your physical workspace with professional branding, premium printing, and essential office supplies.",
};

export default function OfficeTrailPage() {
  return (
    <div className="theme-officetrail">
      <PageHero
        eyebrow="OfficeTrail HUB"
        title="OfficeTrail HUB: Documentation, Printing & Branding"
        subtitle="Equipping your physical workspace with professional branding, premium printing, and essential supplies."
        tone="accent"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" variant="primary" tone="white">
            Request a Quote
          </Button>
          <Button href="#catalog" variant="secondary" tone="white">
            Browse Catalog
          </Button>
        </div>
      </PageHero>
      <ServiceCategories />
      <div id="catalog">
        <CatalogSection />
      </div>
      <PortalTeaser />
      <BottomCta />
    </div>
  );
}
