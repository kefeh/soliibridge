import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import DashboardPreview from "@/components/arclocal/DashboardPreview";
import ArcLocalFeatures from "@/components/arclocal/ArcLocalFeatures";
import ArcLocalResources from "@/components/arclocal/ArcLocalResources";
import BottomCta from "@/components/home/BottomCta";

export const metadata: Metadata = {
  title: "ArcLocal | Cloud Messaging Platform | SoliiBridge",
  description:
    "Reach thousands instantly with ArcLocal's simple, reliable, and trustworthy cloud-based SMS platform for marketing, alerts, and OTPs.",
};

export default function ArcLocalPage() {
  return (
    <div className="theme-arclocal">
      <PageHero
        eyebrow="ArcLocal"
        title="ArcLocal: Your Complete Messaging Platform"
        subtitle="Reach thousands instantly with our simple, reliable, and trustworthy cloud-based SMS platform."
        tone="accent"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" variant="primary" tone="white">
            Launch Platform
          </Button>
          <Button href="/contact" variant="secondary" tone="white">
            Talk to Sales
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
