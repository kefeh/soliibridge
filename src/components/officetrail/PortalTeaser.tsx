import { FileUp, ClipboardList, Bell, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { officetrailSeed } from "@/lib/cms-seed";

const features = [
  { icon: Send, label: "Submit print jobs" },
  { icon: FileUp, label: "Upload documents" },
  { icon: ClipboardList, label: "Track production" },
  { icon: Bell, label: "Receive notifications" },
];

export default function PortalTeaser() {
  const portal = getContentBlock("cms:officetrail:portal", officetrailSeed.portal);

  return (
    <section className="py-24">
      <Container>
        <FadeInUp className="mx-auto max-w-4xl rounded-3xl border border-officetrail-orange/20 bg-officetrail-orange-light/40 p-10 text-center sm:p-14">
          <Badge tone="orange">Coming Soon</Badge>
          <h2 className="mt-5 font-display text-3xl font-bold text-slate-gray-dark">
            {portal.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-gray">{portal.body}</p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.label} className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-white text-officetrail-orange">
                  <feature.icon size={20} strokeWidth={1.5} />
                </div>
                <p className="text-xs font-semibold text-slate-gray-dark">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
