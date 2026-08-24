import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import OurStory from "@/components/about/OurStory";
import VisionMission from "@/components/about/VisionMission";
import CoreValues from "@/components/about/CoreValues";
import BottomCta from "@/components/home/BottomCta";

export const metadata: Metadata = {
  title: "About | SoliiBridge",
  description:
    "SoliiBridge bridges the gap between digital communication and essential office operations through ArcLocal and OfficeTrail HUB.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SoliiBridge"
        title="Bridging the Gap in Digital and Physical Operations"
        subtitle="One ecosystem, two platforms — built to help organizations communicate and operate without friction."
      />
      <OurStory />
      <VisionMission />
      <CoreValues />
      <BottomCta />
    </>
  );
}
