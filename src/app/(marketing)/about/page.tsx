import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import OurStory from "@/components/about/OurStory";
import VisionMission from "@/components/about/VisionMission";
import CoreValues from "@/components/about/CoreValues";
import BottomCta from "@/components/home/BottomCta";
import { getContentBlock } from "@/lib/db";
import { aboutSeed } from "@/lib/cms-seed";

export const metadata: Metadata = {
  title: "About | SoliiBridge",
  description:
    "SoliiBridge bridges the gap between digital communication and essential office operations through ArcLocal and OfficeTrail.",
};

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const hero = getContentBlock("cms:about:hero", aboutSeed.hero);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.headline} subtitle={hero.subheading} />
      <OurStory />
      <VisionMission />
      <CoreValues />
      <BottomCta />
    </>
  );
}
