import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapEmbed from "@/components/contact/MapEmbed";

export const metadata: Metadata = {
  title: "Contact | SoliiBridge",
  description:
    "Get in touch with SoliiBridge for ArcLocal support, OfficeTrail orders, or general inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Have a question about ArcLocal or OfficeTrail HUB? We'd love to hear from you."
      />
      <section className="py-24">
        <Container className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="flex flex-col gap-8 lg:col-span-2">
            <ContactInfo />
            <MapEmbed />
          </div>
        </Container>
      </section>
    </>
  );
}
