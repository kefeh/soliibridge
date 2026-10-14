type Tone = "brand" | "green" | "orange" | "gray";

type BadgeProps = {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

const tones: Record<Tone, string> = {
  brand: "bg-brand/10 text-brand",
  green: "bg-arclocal-green-light text-arclocal-green",
  orange: "bg-officetrail-orange-light text-officetrail-orange",
  gray: "bg-cloud-gray text-slate-gray",
};

export default function Badge({ tone = "brand", className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
