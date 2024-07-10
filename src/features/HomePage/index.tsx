"use client";
import BodyContainer from "@/containers/BodyContainer";

import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import HeroSection from "./HeroSection";

export default function HomeContainer() {
  return (
    <BodyContainer>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
    </BodyContainer>
  );
}
