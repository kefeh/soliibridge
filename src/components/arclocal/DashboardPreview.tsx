import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";

const CHART_HEIGHT_PX = 160;
const bars = [40, 65, 50, 80, 60, 95, 70];

export default function DashboardPreview() {
  return (
    <section className="py-20">
      <Container>
        <FadeInUp className="mx-auto max-w-4xl rounded-3xl border border-border-gray bg-surface-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-arclocal-green">
                Campaign Overview
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-slate-gray-dark">
                Weekly Delivery Volume
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="font-display text-2xl font-bold text-slate-gray-dark">98.7%</p>
                <p className="text-xs font-medium text-slate-gray">Delivery Rate</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-slate-gray-dark">1.2s</p>
                <p className="text-xs font-medium text-slate-gray">Avg. Send Time</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex h-40 items-end gap-3 sm:gap-5">
            {bars.map((height, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-arclocal-green to-arclocal-green/50"
                  style={{ height: `${(height / 100) * CHART_HEIGHT_PX}px` }}
                />
                <span className="text-[10px] font-medium text-slate-gray/60">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
