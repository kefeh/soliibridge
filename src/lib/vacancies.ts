export type VacancySection = {
  heading: string;
  /** One item per line. */
  items: string;
};

export type Vacancy = {
  title: string;
  location: string;
  description: string;
  /** Legacy single "requirements" list, kept so older saved content still renders. */
  requirements?: string;
  sections?: VacancySection[];
};

/** Headings editors can add with one click. */
export const SECTION_PRESETS = [
  "Key Responsibilities",
  "Experience",
  "Qualifications",
  "Skills",
  "What We Offer",
];

/** Sections to show/edit. Older vacancies only had `requirements`, shown as one section. */
export function vacancySections(vacancy: Vacancy): VacancySection[] {
  if (Array.isArray(vacancy.sections)) return vacancy.sections;
  if (vacancy.requirements?.trim()) {
    return [{ heading: "Requirements", items: vacancy.requirements }];
  }
  return [];
}

/** Split a section's text into list items, ignoring blank lines and typed bullet marks. */
export function parseItems(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^\s*(?:[-*•–]\s+)/, "").trim())
    .filter(Boolean);
}
