"use client";

import { useContentSection } from "@/lib/useContentSection";
import { footerSeed, contactSeed } from "@/lib/cms-seed";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSection from "@/components/admin/AdminSection";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function FooterCmsPage() {
  const footer = useContentSection("cms:footer:info", footerSeed);
  const info = useContentSection("cms:contact:info", contactSeed.info);

  const saveAll = async () => {
    await Promise.all([footer.save(), info.save()]);
  };

  return (
    <div>
      <AdminPageHeader
        title="Footer"
        description="Edit the tagline and contact details shown in the site footer. These contact details also appear on the Contact page."
        onSaveAll={saveAll}
      />

      <div className="flex flex-col gap-6">
        <AdminSection title="Tagline">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Footer Tagline</label>
            <textarea
              rows={3}
              className={inputClass}
              value={footer.value.tagline}
              onChange={(e) => footer.setValue({ ...footer.value, tagline: e.target.value })}
            />
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
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
