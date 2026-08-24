import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import FadeInUp from "@/components/motion/FadeInUp";

const articles = [
  {
    tag: "Blog",
    tone: "green" as const,
    title:
      "How ArcLocal Bulk SMS is improving patient appointments in local hospitals",
    excerpt:
      "Automated reminders sent through ArcLocal are helping health facilities reduce missed appointments and improve patient follow-through.",
  },
  {
    tag: "Product Launch",
    tone: "orange" as const,
    title: "OfficeTrail HUB expands branding and large-format printing services",
    excerpt:
      "New equipment and an expanded catalog now cover banners, roll-up stands, and premium business branding packages.",
  },
  {
    tag: "Company Update",
    tone: "blue" as const,
    title: "SoliiBridge crosses 1,200 active customers across 15+ countries",
    excerpt:
      "A look at the milestones behind our growing ecosystem of schools, NGOs, hospitals, businesses, and government partners.",
  },
];

export default function LatestNews() {
  return (
    <section className="py-24">
      <Container>
        <FadeInUp className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-gray-dark sm:text-4xl">
              Latest News
            </h2>
            <p className="mt-3 text-lg text-slate-gray">
              Company updates, product launches, and stories from the ecosystem.
            </p>
          </div>
          <Link
            href="/about"
            className="hidden items-center gap-1 text-sm font-semibold text-corporate-blue sm:flex"
          >
            View all articles <ArrowRight size={16} />
          </Link>
        </FadeInUp>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {articles.map((article, i) => (
            <FadeInUp key={article.title} delay={i * 0.08}>
              <Card className="flex h-full flex-col">
                <Badge tone={article.tone} className="self-start">
                  {article.tag}
                </Badge>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-slate-gray-dark">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-gray">
                  {article.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-corporate-blue">
                  Read more <ArrowRight size={16} />
                </span>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
