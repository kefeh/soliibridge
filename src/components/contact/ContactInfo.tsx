import { Mail, MapPin, Phone, Clock } from "lucide-react";

const items = [
  {
    icon: MapPin,
    label: "Address",
    value: "Counselor's Street Block2B1 Njengang, Bamenda, Cameroon",
  },
  { icon: Phone, label: "Phone", value: "+237 675 40 90 73" },
  { icon: Mail, label: "Email", value: "info@soliibridge.com" },
  { icon: Clock, label: "Office Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM" },
];

export default function ContactInfo() {
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
