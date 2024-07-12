"use client";

import { GeneralLayout } from "@/containers";

import { FooterTemplate } from "../Footer/type";
import { HeaderTemplate } from "../Header/type";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import HeroSection from "./HeroSection";

export default function HomeContainer() {
  return (
    <GeneralLayout
      header={HeaderTemplate.Primary}
      footer={FooterTemplate.Primary}
    >
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
    </GeneralLayout>
  );
}
