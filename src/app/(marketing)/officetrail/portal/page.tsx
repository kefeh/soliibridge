import type { Metadata } from "next";
import { FileUp, ClipboardList, Bell, Send } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { officetrailSeed } from "@/lib/cms-seed";

export const metadata: Metadata = {
  title: "OfficeTrail Platform | Coming Soon | SoliiBridge",
  description:
    "The OfficeTrail customer platform is on the way. Soon you'll be able to manage every print job from a single dashboard.",
};

export const dynamic = "force-dynamic";

const features = [
  { icon: Send, label: "Submit print jobs" },
  { icon: FileUp, label: "Upload documents" },
  { icon: ClipboardList, label: "Track production" },
  { icon: Bell, label: "Receive notifications" },
];

export default function OfficeTrailPortalPage() {
  const portal = getContentBlock("cms:officetrail:portal", officetrailSeed.portal);

  return (
    <div className="theme-officetrail">
      <PageHero eyebrow="OfficeTrail Platform" title={portal.headline} tone="accent">
        <Badge tone="orange">Coming Soon</Badge>
      </PageHero>

      <section className="py-24">
        <Container>
          <FadeInUp className="mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-slate-gray">{portal.body}</p>
          </FadeInUp>

          <FadeInUp delay={0.1} className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.label} className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-officetrail-orange-light text-officetrail-orange">
                  <feature.icon size={20} strokeWidth={1.5} />
                </div>
                <p className="text-center text-xs font-semibold text-slate-gray-dark">
                  {feature.label}
                </p>
              </div>
            ))}
          </FadeInUp>

          <FadeInUp delay={0.2} className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/officetrail" variant="secondary" tone="orange">
              Back to OfficeTrail
            </Button>
            <Button href="/contact" variant="primary" tone="orange">
              Get Notified at Launch
            </Button>
          </FadeInUp>
        </Container>
      </section>
    </div>
  );
}
