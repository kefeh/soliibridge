"use client";

import { usePersistentState } from "@/lib/usePersistentState";
import { contactSeed } from "@/lib/cms-seed";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSection from "@/components/admin/AdminSection";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function ContactCmsPage() {
  const hero = usePersistentState("cms:contact:hero", contactSeed.hero);
  const info = usePersistentState("cms:contact:info", contactSeed.info);

  const saveAll = () => {
    hero.save();
    info.save();
  };

  return (
    <div>
      <AdminPageHeader
        title="Contact Page"
        description="Edit the hero copy and contact details shown on the Contact page and site footer."
        onSaveAll={saveAll}
      />

      <div className="flex flex-col gap-6">
        <AdminSection title="Hero Section">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Eyebrow Badge</label>
              <input
                className={inputClass}
                value={hero.value.eyebrow}
                onChange={(e) => hero.setValue({ ...hero.value, eyebrow: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Headline</label>
              <input
                className={inputClass}
                value={hero.value.headline}
                onChange={(e) => hero.setValue({ ...hero.value, headline: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Subheading</label>
              <textarea
                rows={2}
                className={inputClass}
                value={hero.value.subheading}
                onChange={(e) => hero.setValue({ ...hero.value, subheading: e.target.value })}
              />
            </div>
          </div>
        </AdminSection>

        <AdminSection title="Contact Details">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className={labelClass}>Address</label>
              <input
                className={inputClass}
                value={info.value.address}
                onChange={(e) => info.setValue({ ...info.value, address: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Phone</label>
              <input
                className={inputClass}
                value={info.value.phone}
                onChange={(e) => info.setValue({ ...info.value, phone: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Email</label>
              <input
                className={inputClass}
                value={info.value.email}
                onChange={(e) => info.setValue({ ...info.value, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className={labelClass}>Office Hours</label>
              <input
                className={inputClass}
                value={info.value.hours}
                onChange={(e) => info.setValue({ ...info.value, hours: e.target.value })}
              />
            </div>
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
