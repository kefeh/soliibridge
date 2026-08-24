"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
};

export default function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-border-gray bg-surface-white"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? undefined : item.id)}
              className="flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display font-bold text-slate-gray-dark">
                {item.title}
              </span>
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                className={`shrink-0 text-[var(--color-accent)] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-border-gray px-6 py-5 text-sm leading-relaxed text-slate-gray">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
