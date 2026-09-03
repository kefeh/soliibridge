"use client";

import { useContentSection } from "@/lib/useContentSection";
import { arclocalSeed } from "@/lib/cms-seed";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSection from "@/components/admin/AdminSection";
import RepeatableList from "@/components/admin/RepeatableList";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function ArcLocalCmsPage() {
  const hero = useContentSection("cms:arclocal:hero", arclocalSeed.hero);
  const features = useContentSection("cms:arclocal:features", arclocalSeed.features);
  const resources = useContentSection("cms:arclocal:resources", arclocalSeed.resources);

  const saveAll = async () => {
    await Promise.all([hero.save(), features.save(), resources.save()]);
  };

  return (
    <div>
      <AdminPageHeader
        title="ArcLocal Page"
        description="Edit the ArcLocal landing page hero, feature list, and resource cards."
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Primary Button Label</label>
                <input
                  className={inputClass}
                  value={hero.value.primaryCtaLabel}
                  onChange={(e) =>
                    hero.setValue({ ...hero.value, primaryCtaLabel: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Secondary Button Label</label>
                <input
                  className={inputClass}
                  value={hero.value.secondaryCtaLabel}
                  onChange={(e) =>
                    hero.setValue({ ...hero.value, secondaryCtaLabel: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </AdminSection>

        <AdminSection title="Core Features" description="The 7-item feature grid.">
          <RepeatableList
            items={features.value}
            onChange={features.setValue}
            itemLabel="Feature"
            emptyItem={() => ({ title: "New Feature", description: "" })}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
          />
        </AdminSection>

        <AdminSection title="Resources & Portal" description="Pricing, Customer Login, and API Documentation cards.">
          <RepeatableList
            items={resources.value}
            onChange={resources.setValue}
            itemLabel="Resource"
            emptyItem={() => ({
              title: "New Resource",
              description: "",
              ctaLabel: "Learn More",
              comingSoon: "no",
            })}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "ctaLabel", label: "Button Label" },
              { key: "comingSoon", label: "Coming Soon?", type: "select", options: ["yes", "no"] },
            ]}
          />
        </AdminSection>
      </div>
    </div>
  );
}
