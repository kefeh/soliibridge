"use client";

import { useContentSection } from "@/lib/useContentSection";
import { careersSeed } from "@/lib/cms-seed";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSection from "@/components/admin/AdminSection";
import VacancyEditor from "@/components/admin/VacancyEditor";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function CareersCmsPage() {
  const hero = useContentSection("cms:careers:hero", careersSeed.hero);
  const vacancies = useContentSection("cms:careers:vacancies", careersSeed.vacancies);

  const saveAll = async () => {
    await Promise.all([hero.save(), vacancies.save()]);
  };

  return (
    <div>
      <AdminPageHeader
        title="Careers Page"
        description="Edit the intro copy and current job vacancies."
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
              <textarea
                rows={2}
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

        <AdminSection
          title="Current Vacancies"
          description="Each role's title, location, description, and any number of sections such as Key Responsibilities or Experience."
        >
          <VacancyEditor items={vacancies.value} onChange={vacancies.setValue} />
        </AdminSection>
      </div>
    </div>
  );
}
