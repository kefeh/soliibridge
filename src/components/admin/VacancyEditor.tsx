"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { inputClass, labelClass } from "@/components/ui/formStyles";
import {
  SECTION_PRESETS,
  vacancySections,
  type Vacancy,
  type VacancySection,
} from "@/lib/vacancies";

const iconButton =
  "flex h-8 w-8 items-center justify-center rounded-lg text-slate-gray/60 transition-colors hover:bg-cloud-gray hover:text-slate-gray-dark disabled:opacity-30 disabled:hover:bg-transparent";

export default function VacancyEditor({
  items,
  onChange,
}: {
  items: Vacancy[];
  onChange: (items: Vacancy[]) => void;
}) {
  const update = (index: number, patch: Partial<Vacancy>) => {
    const next = items.slice();
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  // Editing sections converts an older vacancy (single "requirements" text) to sections.
  const setSections = (index: number, sections: VacancySection[]) =>
    update(index, { sections, requirements: undefined });

  const move = <T,>(list: T[], from: number, to: number) => {
    const next = list.slice();
    [next[from], next[to]] = [next[to], next[from]];
    return next;
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((vacancy, i) => {
        const sections = vacancySections(vacancy);
        const used = new Set(sections.map((section) => section.heading.trim().toLowerCase()));
        const availablePresets = SECTION_PRESETS.filter((p) => !used.has(p.toLowerCase()));
        return (
          <div key={i} className="rounded-xl border border-border-gray bg-surface-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-gray/50">
                Vacancy {i + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className={iconButton}
                  disabled={i === 0}
                  onClick={() => onChange(move(items, i, i - 1))}
                  aria-label={`Move vacancy ${i + 1} up`}
                >
                  <ArrowUp size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  className={iconButton}
                  disabled={i === items.length - 1}
                  onClick={() => onChange(move(items, i, i + 1))}
                  aria-label={`Move vacancy ${i + 1} down`}
                >
                  <ArrowDown size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  className={`${iconButton} hover:!bg-red-50 hover:!text-red-600`}
                  onClick={() => onChange(items.filter((_, n) => n !== i))}
                  aria-label={`Remove vacancy ${i + 1}`}
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Job Title</label>
                <input
                  className={inputClass}
                  value={vacancy.title}
                  onChange={(e) => update(i, { title: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Location / Type</label>
                <input
                  className={inputClass}
                  value={vacancy.location}
                  onChange={(e) => update(i, { location: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  rows={3}
                  className={inputClass}
                  value={vacancy.description}
                  onChange={(e) => update(i, { description: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-6 border-t border-border-gray pt-5">
              <p className={labelClass}>Sections</p>
              <p className="mt-1 text-xs text-slate-gray">
                Each section appears as its own highlighted block under the description, for
                example Key Responsibilities or Experience.
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {sections.map((section, j) => (
                  <div key={j} className="rounded-lg border border-border-gray bg-cloud-gray/60 p-4">
                    <div className="flex items-end gap-2">
                      <div className="flex flex-1 flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-gray">Section heading</label>
                        <input
                          className={inputClass}
                          placeholder="e.g. Key Responsibilities"
                          value={section.heading}
                          onChange={(e) =>
                            setSections(
                              i,
                              sections.map((s, n) => (n === j ? { ...s, heading: e.target.value } : s))
                            )
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className={iconButton}
                        disabled={j === 0}
                        onClick={() => setSections(i, move(sections, j, j - 1))}
                        aria-label={`Move section ${j + 1} up`}
                      >
                        <ArrowUp size={16} strokeWidth={1.5} />
                      </button>
                      <button
                        type="button"
                        className={iconButton}
                        disabled={j === sections.length - 1}
                        onClick={() => setSections(i, move(sections, j, j + 1))}
                        aria-label={`Move section ${j + 1} down`}
                      >
                        <ArrowDown size={16} strokeWidth={1.5} />
                      </button>
                      <button
                        type="button"
                        className={`${iconButton} hover:!bg-red-50 hover:!text-red-600`}
                        onClick={() => setSections(i, sections.filter((_, n) => n !== j))}
                        aria-label={`Remove section ${j + 1}`}
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-gray">
                        Items (one per line)
                      </label>
                      <textarea
                        rows={4}
                        className={inputClass}
                        value={section.items}
                        onChange={(e) =>
                          setSections(
                            i,
                            sections.map((s, n) => (n === j ? { ...s, items: e.target.value } : s))
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-gray">Add section:</span>
                {availablePresets.map((heading) => (
                  <button
                    key={heading}
                    type="button"
                    onClick={() => setSections(i, [...sections, { heading, items: "" }])}
                    className="inline-flex min-h-[36px] items-center gap-1 rounded-full border border-border-gray bg-surface-white px-3 text-xs font-semibold text-slate-gray transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <Plus size={12} strokeWidth={2} /> {heading}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSections(i, [...sections, { heading: "", items: "" }])}
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-full border border-dashed border-border-gray px-3 text-xs font-semibold text-slate-gray transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <Plus size={12} strokeWidth={2} /> Custom section
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          onChange([
            ...items,
            {
              title: "New Role",
              location: "Bamenda, Cameroon · Full-time",
              description: "",
              sections: [
                { heading: "Key Responsibilities", items: "" },
                { heading: "Experience", items: "" },
              ],
            },
          ])
        }
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-dashed border-border-gray py-3 text-sm font-semibold text-slate-gray transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        <Plus size={16} strokeWidth={2} /> Add Vacancy
      </button>
    </div>
  );
}
