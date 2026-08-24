"use client";

import { usePersistentState } from "@/lib/usePersistentState";
import { aboutSeed } from "@/lib/cms-seed";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSection from "@/components/admin/AdminSection";
import RepeatableList from "@/components/admin/RepeatableList";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function AboutCmsPage() {
  const hero = usePersistentState("cms:about:hero", aboutSeed.hero);
  const story = usePersistentState("cms:about:story", aboutSeed.story);
  const vision = usePersistentState("cms:about:vision", aboutSeed.vision);
  const mission = usePersistentState("cms:about:mission", aboutSeed.mission);
  const coreValues = usePersistentState("cms:about:coreValues", aboutSeed.coreValues);

  const saveAll = () => {
    hero.save();
    story.save();
    vision.save();
    mission.save();
    coreValues.save();
  };

  return (
    <div>
      <AdminPageHeader
        title="About Page"
        description="Edit the company story, vision, mission, and core values."
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

        <AdminSection title="Our Story">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Section Heading</label>
              <input
                className={inputClass}
                value={story.value.heading}
                onChange={(e) => story.setValue({ ...story.value, heading: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Body</label>
              <textarea
                rows={4}
                className={inputClass}
                value={story.value.body}
                onChange={(e) => story.setValue({ ...story.value, body: e.target.value })}
              />
            </div>
          </div>
        </AdminSection>

        <AdminSection title="Vision & Mission">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Vision Statement</label>
              <textarea
                rows={3}
                className={inputClass}
                value={vision.value}
                onChange={(e) => vision.setValue(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Mission Statement</label>
              <textarea
                rows={3}
                className={inputClass}
                value={mission.value}
                onChange={(e) => mission.setValue(e.target.value)}
              />
            </div>
          </div>
        </AdminSection>

        <AdminSection title="Core Values">
          <RepeatableList
            items={coreValues.value}
            onChange={coreValues.setValue}
            itemLabel="Value"
            emptyItem={() => ({ title: "New Value", description: "" })}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
          />
        </AdminSection>
      </div>
    </div>
  );
}
