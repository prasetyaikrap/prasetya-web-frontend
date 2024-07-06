"use client";

import { BreakpointSignal } from "@/components";
import BodyContainer from "@/containers/BodyContainer";

import HeroSection from "./HeroSection";

export default function HomeContainer() {
  return (
    <BodyContainer>
      <BreakpointSignal
        chakra={{
          position: "fixed",
          zIndex: 10,
          left: 0,
          top: "50%",
          height: "80px",
        }}
      />
      <HeroSection />
    </BodyContainer>
  );
}
