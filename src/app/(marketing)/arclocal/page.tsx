import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import DashboardPreview from "@/components/arclocal/DashboardPreview";
import ArcLocalFeatures from "@/components/arclocal/ArcLocalFeatures";
import ArcLocalResources from "@/components/arclocal/ArcLocalResources";
import BottomCta from "@/components/home/BottomCta";
import { getContentBlock } from "@/lib/db";
import { arclocalSeed } from "@/lib/cms-seed";

export const metadata: Metadata = {
  title: "ArcLocal | Cloud Messaging Platform | SoliiBridge",
  description:
    "Reach thousands instantly with ArcLocal's simple, reliable, and trustworthy cloud-based SMS platform for marketing, alerts, and OTPs.",
};

export const dynamic = "force-dynamic";

export default function ArcLocalPage() {
  const hero = getContentBlock("cms:arclocal:hero", arclocalSeed.hero);

  return (
    <div className="theme-arclocal">
      <PageHero eyebrow={hero.eyebrow} title={hero.headline} subtitle={hero.subheading} tone="accent">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" variant="primary" tone="white">
            {hero.primaryCtaLabel}
          </Button>
          <Button href="/contact" variant="secondary" tone="white">
            {hero.secondaryCtaLabel}
          </Button>
        </div>
      </PageHero>
      <DashboardPreview />
      <ArcLocalFeatures />
      <ArcLocalResources />
      <BottomCta />
    </div>
  );
}
