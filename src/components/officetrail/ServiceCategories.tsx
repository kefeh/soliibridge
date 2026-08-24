import {
  FileText,
  Printer,
  Palette,
  Package,
  Briefcase,
  Truck,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInUp from "@/components/motion/FadeInUp";

const categories = [
  { icon: FileText, title: "Documentation" },
  { icon: Printer, title: "Printing" },
  { icon: Palette, title: "Branding" },
  { icon: Package, title: "Office Supplies" },
  { icon: Briefcase, title: "Business Support" },
  { icon: Truck, title: "Delivery Services" },
];

export default function ServiceCategories() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          title="Everything Your Workspace Needs"
          subtitle="From documentation to delivery, one partner for every physical operation."
        />
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, i) => (
            <FadeInUp key={category.title} delay={i * 0.05}>
              <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border-gray bg-surface-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-officetrail-orange-light text-officetrail-orange">
                  <category.icon size={22} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-slate-gray-dark">
                  {category.title}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
