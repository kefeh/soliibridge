type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border-gray bg-surface-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(15,23,42,0.06),0_16px_32px_rgba(15,23,42,0.1)] ${className}`}
    >
      {children}
    </div>
  );
}
