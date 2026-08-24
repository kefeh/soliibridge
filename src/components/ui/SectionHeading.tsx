import FadeInUp from "@/components/motion/FadeInUp";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <FadeInUp className={`flex max-w-2xl flex-col gap-4 ${alignClass} ${className}`}>
      <h2 className="font-display text-3xl font-bold text-slate-gray-dark sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="text-lg text-slate-gray">{subtitle}</p>}
    </FadeInUp>
  );
}
