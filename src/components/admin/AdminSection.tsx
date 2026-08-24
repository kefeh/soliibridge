type AdminSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function AdminSection({ title, description, children }: AdminSectionProps) {
  return (
    <section className="rounded-2xl border border-border-gray bg-surface-white p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="font-display text-lg font-bold text-slate-gray-dark">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-gray">{description}</p>}
      </div>
      {children}
    </section>
  );
}
