"use client";

import { usePersistentState } from "@/lib/usePersistentState";
import { careersSeed } from "@/lib/cms-seed";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSection from "@/components/admin/AdminSection";
import RepeatableList from "@/components/admin/RepeatableList";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function CareersCmsPage() {
  const hero = usePersistentState("cms:careers:hero", careersSeed.hero);
  const vacancies = usePersistentState("cms:careers:vacancies", careersSeed.vacancies);

  const saveAll = () => {
    hero.save();
    vacancies.save();
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
          description="Each role's title, location, description, and requirements (one per line)."
        >
          <RepeatableList
            items={vacancies.value}
            onChange={vacancies.setValue}
            itemLabel="Vacancy"
            emptyItem={() => ({
              title: "New Role",
              location: "Bamenda, Cameroon · Full-time",
              description: "",
              requirements: "",
            })}
            fields={[
              { key: "title", label: "Job Title" },
              { key: "location", label: "Location / Type" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "requirements", label: "Requirements (one per line)", type: "textarea" },
            ]}
          />
        </AdminSection>
      </div>
    </div>
  );
}
