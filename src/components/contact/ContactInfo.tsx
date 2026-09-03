import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { getContentBlock } from "@/lib/db";
import { contactSeed } from "@/lib/cms-seed";

export default function ContactInfo() {
  const info = getContentBlock("cms:contact:info", contactSeed.info);

  const items = [
    { icon: MapPin, label: "Address", value: info.address },
    { icon: Phone, label: "Phone", value: info.phone },
    { icon: Mail, label: "Email", value: info.email },
    { icon: Clock, label: "Office Hours", value: info.hours },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border-gray bg-surface-white p-8 sm:p-10">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-corporate-blue/10 text-corporate-blue">
            <item.icon size={20} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-gray/60">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-slate-gray-dark">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
