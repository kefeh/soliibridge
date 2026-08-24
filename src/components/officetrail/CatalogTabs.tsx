import { Check } from "lucide-react";
import Tabs from "@/components/ui/Tabs";

const printing = [
  "Business Cards",
  "Flyers",
  "Brochures",
  "Certificates",
  "Receipt Books",
  "Letterheads",
  "Banners",
  "Roll-up Stands",
  "Stickers",
];

const officeSupplies = [
  "Stationery",
  "Files",
  "Pens",
  "Printers",
  "Paper",
  "Toners",
  "Ink",
  "Office Furniture",
  "Computer & Accessories",
];

const services = [
  { title: "Documentation", description: "Professional document preparation and formatting." },
  { title: "Branding", description: "Business identity design across print and digital." },
  { title: "Business Support", description: "Administrative and operational support services." },
  { title: "Delivery Services", description: "Reliable delivery for print jobs and supply orders." },
];

function CatalogGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-2 rounded-xl border border-border-gray bg-surface-white px-4 py-3"
        >
          <Check size={16} strokeWidth={2} className="shrink-0 text-officetrail-orange" />
          <span className="text-sm font-medium text-slate-gray-dark">{item}</span>
        </div>
      ))}
    </div>
  );
}

function ServicesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((service) => (
        <div
          key={service.title}
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
  return (
    <Tabs
      tabs={[
        { id: "printing", label: "Printing", content: <CatalogGrid items={printing} /> },
        {
          id: "supplies",
          label: "Office Supplies",
          content: <CatalogGrid items={officeSupplies} />,
        },
        { id: "services", label: "Services", content: <ServicesGrid /> },
      ]}
    />
  );
}
