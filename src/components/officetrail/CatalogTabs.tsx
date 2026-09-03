import { Check } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import { getContentBlock } from "@/lib/db";
import { officetrailSeed } from "@/lib/cms-seed";

function CatalogGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={`${item}-${i}`}
          className="flex items-center gap-2 rounded-xl border border-border-gray bg-surface-white px-4 py-3"
        >
          <Check size={16} strokeWidth={2} className="shrink-0 text-officetrail-orange" />
          <span className="text-sm font-medium text-slate-gray-dark">{item}</span>
        </div>
      ))}
    </div>
  );
}

function ServicesGrid({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((service, i) => (
        <div
          key={`${service.title}-${i}`}
          className="rounded-xl border border-border-gray bg-surface-white p-5"
        >
          <p className="font-display font-bold text-slate-gray-dark">{service.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-gray">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function CatalogTabs() {
  const printing = getContentBlock(
    "cms:officetrail:printingItems",
    officetrailSeed.printingItems
  ).map((item) => item.name);
  const officeSupplies = getContentBlock(
    "cms:officetrail:officeSupplyItems",
    officetrailSeed.officeSupplyItems
  ).map((item) => item.name);
  const services = getContentBlock("cms:officetrail:services", officetrailSeed.services);

  return (
    <Tabs
      tabs={[
        { id: "printing", label: "Printing", content: <CatalogGrid items={printing} /> },
        {
          id: "supplies",
          label: "Office Supplies",
          content: <CatalogGrid items={officeSupplies} />,
        },
        { id: "services", label: "Services", content: <ServicesGrid items={services} /> },
      ]}
    />
  );
}
