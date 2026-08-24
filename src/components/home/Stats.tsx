import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";
import AnimatedCounter from "@/components/home/AnimatedCounter";

const stats = [
  { target: 10000, suffix: "+", label: "SMS Delivered" },
  { target: 500, suffix: "+", label: "Businesses Served" },
  { target: 50000, suffix: "+", label: "Documents Printed" },
  { target: 1200, suffix: "+", label: "Active Customers" },
  { target: 15, suffix: "+", label: "Countries Served" },
  { target: 99, suffix: "%", label: "Support Satisfaction" },
];

export default function Stats() {
  return (
    <section className="bg-corporate-blue-dark py-20">
      <Container>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, i) => (
            <FadeInUp key={stat.label} delay={i * 0.05} className="text-center">
              <div className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm font-medium text-white/60">{stat.label}</p>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
