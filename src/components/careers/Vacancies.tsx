import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeInUp from "@/components/motion/FadeInUp";
import Accordion from "@/components/ui/Accordion";

const vacancies = [
  {
    id: "arclocal-backend-developer",
    title: "ArcLocal Backend Developer",
    tone: "green" as const,
    location: "Bamenda, Cameroon · Full-time",
    description:
      "Build and scale the messaging infrastructure behind ArcLocal, handling bulk SMS delivery, OTP flows, and campaign scheduling for thousands of businesses.",
    requirements: [
      "3+ years building backend services in Node.js, Python, or Go",
      "Experience with message queues and high-throughput systems",
      "Familiarity with SMS gateway or telecom API integrations",
      "Solid understanding of relational databases and caching",
    ],
  },
  {
    id: "officetrail-print-production-manager",
    title: "OfficeTrail Print Production Manager",
    tone: "orange" as const,
    location: "Bamenda, Cameroon · Full-time",
    description:
      "Oversee daily print production operations, from business cards to large-format banners, ensuring quality and on-time delivery for every order.",
    requirements: [
      "3+ years managing a print production floor or workshop",
      "Hands-on experience with offset and digital printing equipment",
      "Strong quality control and inventory management skills",
      "Ability to coordinate multiple orders under tight deadlines",
    ],
  },
  {
    id: "b2b-sales-executive",
    title: "B2B Sales Executive",
    tone: "blue" as const,
    location: "Bamenda, Cameroon · Full-time",
    description:
      "Drive new business across ArcLocal and OfficeTrail HUB, building relationships with schools, NGOs, hospitals, and corporate clients.",
    requirements: [
      "2+ years in B2B sales or account management",
      "Excellent communication skills in English and French",
      "Comfortable with outbound prospecting and client presentations",
      "Experience selling SaaS or office services is a plus",
    ],
  },
];

export default function Vacancies() {
  return (
    <section className="py-24">
      <Container className="mx-auto max-w-3xl">
        <SectionHeading title="Current Vacancies" />
        <FadeInUp delay={0.1} className="mt-14">
          <Accordion
            items={vacancies.map((vacancy) => ({
              id: vacancy.id,
              title: vacancy.title,
              content: (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone={vacancy.tone}>{vacancy.location}</Badge>
                  </div>
                  <p>{vacancy.description}</p>
                  <div>
                    <p className="font-semibold text-slate-gray-dark">Requirements</p>
                    <ul className="mt-2 flex flex-col gap-1.5 list-disc pl-5">
                      {vacancy.requirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Button href="#apply" variant="primary" tone="accent" className="self-start">
                    Apply for this Role
                  </Button>
                </div>
              ),
            }))}
          />
        </FadeInUp>
      </Container>
    </section>
  );
}
