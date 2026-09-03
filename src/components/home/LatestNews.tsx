import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { homeSeed } from "@/lib/cms-seed";

const TAG_TONES: Record<string, "blue" | "green" | "orange" | "gray"> = {
  Blog: "green",
  "Product Launch": "orange",
  "Company Update": "blue",
};

export default function LatestNews() {
  const articles = getContentBlock("cms:home:news", homeSeed.news);

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
            <FadeInUp key={`${article.title}-${i}`} delay={i * 0.08}>
              <Card className="flex h-full flex-col">
                <Badge tone={TAG_TONES[article.tag] ?? "gray"} className="self-start">
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
