"use client";

import { useContentSection } from "@/lib/useContentSection";
import { officetrailSeed } from "@/lib/cms-seed";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSection from "@/components/admin/AdminSection";
import RepeatableList from "@/components/admin/RepeatableList";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function OfficeTrailCmsPage() {
  const hero = useContentSection("cms:officetrail:hero", officetrailSeed.hero);
  const categories = useContentSection("cms:officetrail:categories", officetrailSeed.categories);
  const printingItems = useContentSection(
    "cms:officetrail:printingItems",
    officetrailSeed.printingItems
  );
  const officeSupplyItems = useContentSection(
    "cms:officetrail:officeSupplyItems",
    officetrailSeed.officeSupplyItems
  );
  const services = useContentSection("cms:officetrail:services", officetrailSeed.services);
  const portal = useContentSection("cms:officetrail:portal", officetrailSeed.portal);

  const saveAll = async () => {
    await Promise.all([
      hero.save(),
      categories.save(),
      printingItems.save(),
      officeSupplyItems.save(),
      services.save(),
      portal.save(),
    ]);
  };

  return (
    <div>
      <AdminPageHeader
        title="OfficeTrail Page"
        description="Edit the hero, service categories, catalog tabs, and portal teaser."
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

        <AdminSection title="Service Categories" description="The 6-item category grid.">
          <RepeatableList
            items={categories.value}
            onChange={categories.setValue}
            itemLabel="Category"
            emptyItem={() => ({ title: "New Category" })}
            fields={[{ key: "title", label: "Title" }]}
          />
        </AdminSection>

        <AdminSection title="Catalog — Printing">
          <RepeatableList
            items={printingItems.value}
            onChange={printingItems.setValue}
            itemLabel="Item"
            emptyItem={() => ({ name: "New Item" })}
            fields={[{ key: "name", label: "Name" }]}
          />
        </AdminSection>

        <AdminSection title="Catalog — Office Supplies">
          <RepeatableList
            items={officeSupplyItems.value}
            onChange={officeSupplyItems.setValue}
            itemLabel="Item"
            emptyItem={() => ({ name: "New Item" })}
            fields={[{ key: "name", label: "Name" }]}
          />
        </AdminSection>

        <AdminSection title="Catalog — Services">
          <RepeatableList
            items={services.value}
            onChange={services.setValue}
            itemLabel="Service"
            emptyItem={() => ({ title: "New Service", description: "" })}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
          />
        </AdminSection>

        <AdminSection title="Portal Teaser" description="The 'Coming Soon' customer portal banner.">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Headline</label>
              <input
                className={inputClass}
                value={portal.value.headline}
                onChange={(e) => portal.setValue({ ...portal.value, headline: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Body</label>
              <textarea
                rows={3}
                className={inputClass}
                value={portal.value.body}
                onChange={(e) => portal.setValue({ ...portal.value, body: e.target.value })}
              />
            </div>
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
