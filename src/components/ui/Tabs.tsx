"use client";

import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div
        role="tablist"
        className="flex gap-2 overflow-x-auto rounded-xl border border-border-gray bg-cloud-gray p-1.5"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`min-h-11 shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
              active === tab.id
                ? "bg-surface-white text-[var(--color-accent)] shadow-sm"
                : "text-slate-gray hover:text-slate-gray-dark"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tabs.map((tab) =>
          tab.id === active ? <div key={tab.id}>{tab.content}</div> : null
        )}
      </div>
    </div>
  );
}
