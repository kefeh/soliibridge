import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import ServiceCategories from "@/components/officetrail/ServiceCategories";
import CatalogSection from "@/components/officetrail/CatalogSection";
import PortalTeaser from "@/components/officetrail/PortalTeaser";
import BottomCta from "@/components/home/BottomCta";
import { getContentBlock } from "@/lib/db";
import { officetrailSeed } from "@/lib/cms-seed";

export const metadata: Metadata = {
  title: "OfficeTrail HUB | Documentation, Printing & Branding | SoliiBridge",
  description:
    "Equipping your physical workspace with professional branding, premium printing, and essential office supplies.",
};

export const dynamic = "force-dynamic";

export default function OfficeTrailPage() {
  const hero = getContentBlock("cms:officetrail:hero", officetrailSeed.hero);

  return (
    <div className="theme-officetrail">
      <PageHero eyebrow={hero.eyebrow} title={hero.headline} subtitle={hero.subheading} tone="accent">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" variant="primary" tone="white">
            {hero.primaryCtaLabel}
          </Button>
          <Button href="#catalog" variant="secondary" tone="white">
            {hero.secondaryCtaLabel}
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
