"use client";

import { Trash2, Plus } from "lucide-react";
import { inputClass, labelClass } from "@/components/ui/formStyles";

type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
};

type RepeatableListProps<T extends Record<string, string>> = {
  items: T[];
  onChange: (items: T[]) => void;
  fields: FieldConfig[];
  emptyItem: () => T;
  itemLabel?: string;
};

export default function RepeatableList<T extends Record<string, string>>({
  items,
  onChange,
  fields,
  emptyItem,
  itemLabel = "Item",
}: RepeatableListProps<T>) {
  const updateField = (index: number, key: string, fieldValue: string) => {
    const next = items.slice();
    next[index] = { ...next[index], [key]: fieldValue };
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));
  const add = () => onChange([...items, emptyItem()]);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-border-gray bg-surface-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-gray/50">
              {itemLabel} {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Remove ${itemLabel.toLowerCase()} ${i + 1}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-gray/50 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.key}
                className={
                  field.type === "textarea"
                    ? "flex flex-col gap-1.5 sm:col-span-2"
                    : "flex flex-col gap-1.5"
                }
              >
                <label className={labelClass}>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={item[field.key] ?? ""}
                    onChange={(e) => updateField(i, field.key, e.target.value)}
                  />
                ) : field.type === "select" ? (
                  <select
                    className={inputClass}
                    value={item[field.key] ?? ""}
                    onChange={(e) => updateField(i, field.key, e.target.value)}
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={inputClass}
                    value={item[field.key] ?? ""}
                    onChange={(e) => updateField(i, field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-dashed border-border-gray py-3 text-sm font-semibold text-slate-gray transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        <Plus size={16} strokeWidth={2} /> Add {itemLabel}
      </button>
    </div>
  );
}
