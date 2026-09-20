"use client";

import { useContentSection } from "@/lib/useContentSection";
import { homeSeed } from "@/lib/cms-seed";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSection from "@/components/admin/AdminSection";
import RepeatableList from "@/components/admin/RepeatableList";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function HomeCmsPage() {
  const hero = useContentSection("cms:home:hero", homeSeed.hero);
  const stats = useContentSection("cms:home:stats", homeSeed.stats);
  const services = useContentSection("cms:home:services", homeSeed.services);
  const whyChooseUs = useContentSection("cms:home:whyChooseUs", homeSeed.whyChooseUs);
  const testimonials = useContentSection("cms:home:testimonials", homeSeed.testimonials);
  const partners = useContentSection("cms:home:partners", homeSeed.partners);
  const news = useContentSection("cms:home:news", homeSeed.news);
  const bottomCta = useContentSection("cms:home:bottomCta", homeSeed.bottomCta);

  const saveAll = async () => {
    await Promise.all([
      hero.save(),
      stats.save(),
      services.save(),
      whyChooseUs.save(),
      testimonials.save(),
      partners.save(),
      news.save(),
      bottomCta.save(),
    ]);
  };

  return (
    <div>
      <AdminPageHeader
        title="Home Page"
        description="Edit the hero, stats, services, and every dynamic list shown on the homepage."
        onSaveAll={saveAll}
      />

      <div className="flex flex-col gap-6">
        <AdminSection title="Hero Section" description="The top banner and headline visitors see first.">
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

        <AdminSection title="Live Statistics" description="The animated counters shown on scroll.">
          <RepeatableList
            items={stats.value}
            onChange={stats.setValue}
            itemLabel="Stat"
            emptyItem={() => ({ label: "New Stat", target: "0", suffix: "+" })}
            fields={[
              { key: "target", label: "Number" },
              { key: "suffix", label: "Suffix (e.g. +, %)" },
              { key: "label", label: "Label" },
            ]}
          />
        </AdminSection>

        <AdminSection title="Services Overview" description="ArcLocal and OfficeTrail summary cards.">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-sm font-bold text-arclocal-green">ArcLocal</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={services.value.arclocalDescription}
                    onChange={(e) =>
                      services.setValue({ ...services.value, arclocalDescription: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Button Label</label>
                  <input
                    className={inputClass}
                    value={services.value.arclocalCtaLabel}
                    onChange={(e) =>
                      services.setValue({ ...services.value, arclocalCtaLabel: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-border-gray pt-6">
              <p className="mb-3 text-sm font-bold text-officetrail-orange">OfficeTrail</p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={services.value.officetrailDescription}
                    onChange={(e) =>
                      services.setValue({
                        ...services.value,
                        officetrailDescription: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Button Label</label>
                  <input
                    className={inputClass}
                    value={services.value.officetrailCtaLabel}
                    onChange={(e) =>
                      services.setValue({ ...services.value, officetrailCtaLabel: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </AdminSection>

        <AdminSection title="Why Choose SoliiBridge" description="The feature badge grid.">
          <RepeatableList
            items={whyChooseUs.value}
            onChange={whyChooseUs.setValue}
            itemLabel="Feature"
            emptyItem={() => ({ label: "New Feature" })}
            fields={[{ key: "label", label: "Label" }]}
          />
        </AdminSection>

        <AdminSection title="Testimonials" description="Customer quotes shown in the sector grid.">
          <RepeatableList
            items={testimonials.value}
            onChange={testimonials.setValue}
            itemLabel="Testimonial"
            emptyItem={() => ({ quote: "", name: "", category: "" })}
            fields={[
              { key: "category", label: "Category" },
              { key: "name", label: "Attribution" },
              { key: "quote", label: "Quote", type: "textarea" },
            ]}
          />
        </AdminSection>

        <AdminSection title="Partners" description="The auto-scrolling partner logo marquee.">
          <RepeatableList
            items={partners.value}
            onChange={partners.setValue}
            itemLabel="Partner"
            emptyItem={() => ({ name: "New Partner" })}
            fields={[{ key: "name", label: "Name" }]}
          />
        </AdminSection>

        <AdminSection title="Latest News" description="Article cards shown near the bottom of the page.">
          <RepeatableList
            items={news.value}
            onChange={news.setValue}
            itemLabel="Article"
            emptyItem={() => ({ tag: "Blog", title: "", excerpt: "" })}
            fields={[
              { key: "tag", label: "Tag" },
              { key: "title", label: "Title" },
              { key: "excerpt", label: "Excerpt", type: "textarea" },
            ]}
          />
        </AdminSection>

        <AdminSection title="Bottom Call to Action">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Headline</label>
              <input
                className={inputClass}
                value={bottomCta.value.headline}
                onChange={(e) =>
                  bottomCta.setValue({ ...bottomCta.value, headline: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Button Label</label>
              <input
                className={inputClass}
                value={bottomCta.value.buttonLabel}
                onChange={(e) =>
                  bottomCta.setValue({ ...bottomCta.value, buttonLabel: e.target.value })
                }
              />
            </div>
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
