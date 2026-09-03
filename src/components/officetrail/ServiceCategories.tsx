import { FileText, Printer, Palette, Package, Briefcase, Truck, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { officetrailSeed } from "@/lib/cms-seed";

const icons = [FileText, Printer, Palette, Package, Briefcase, Truck];

export default function ServiceCategories() {
  const categories = getContentBlock("cms:officetrail:categories", officetrailSeed.categories);

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          title="Everything Your Workspace Needs"
          subtitle="From documentation to delivery, one partner for every physical operation."
        />
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <FadeInUp key={`${category.title}-${i}`} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border-gray bg-surface-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-officetrail-orange-light text-officetrail-orange">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-slate-gray-dark">
                    {category.title}
                  </p>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
