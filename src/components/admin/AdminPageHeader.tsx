"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  onSaveAll: () => Promise<void>;
};

export default function AdminPageHeader({ title, description, onSaveAll }: AdminPageHeaderProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSaveAll();
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-gray-dark">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-gray">{description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-arclocal-green">
            <CheckCircle2 size={16} strokeWidth={1.5} />
            Saved
          </span>
        )}
        <Button
          type="button"
          variant="primary"
          tone="accent"
          onClick={handleSave}
          disabled={saving}
          className="disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
