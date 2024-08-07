import {
  AspectRatio,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { FaMapLocationDot } from "react-icons/fa6";

import { Section } from "@/components";

import { SocialMediaStack } from "./components";
import { socialMediaData } from "./constants";

export default function HeroSection() {
  return (
    <Section
      chakra={{
        bg: "brand.600",
        padding: { base: "20px", sm: "40px", md: "80px" },
        paddingTop: { base: "20px", sm: "40px" },
        height: { base: "calc(100vh - 80px)", md: "calc(100vh - 100px)" },
        maxHeight: "800px",
      }}
    >
      <Stack
        direction={{ base: "column-reverse", md: "row" }}
        spacing={{ base: "20px", md: "40px" }}
        flex="1"
        width={{ base: "full", lg: "90%", xl: "80%" }}
      >
        <VStack
          flex={{ base: 2, md: 4 }}
          height="full"
          justifyContent="center"
          alignItems={{ base: "center", md: "flex-start" }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "16px", sm: "24px", lg: "32px", "2xl": "40px" }}
            fontWeight={500}
            textAlign={{ base: "center", md: "left" }}
            color="monochrome.200"
          >
            Full Stack Software Developer
          </Heading>
          <Heading
            as="h1"
            fontSize={{ base: "24px", sm: "32px", lg: "48px", "2xl": "60px" }}
            fontWeight={700}
            textAlign={{ base: "center", md: "left" }}
            color="monochrome.200"
          >
            Prasetya Ikra Priyadi
          </Heading>
          <Text
            as="p"
            fontSize={{ base: "12px", sm: "16px", lg: "24px", "2xl": "32px" }}
            fontWeight={200}
            textAlign={{ base: "center", md: "left" }}
            color="monochrome.200"
          >
            Building your Digital Apps with exceptional User Experiences
          </Text>
          <HStack
            width="full"
            spacing="20px"
            fontSize={{ base: "12px", sm: "16px" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            marginTop="10px"
          >
            <FaMapLocationDot color="var(--chakra-colors-monochrome-200)" />
            <Text color="monochrome.200">Bandung, West Java, Indonesia 🇮🇩</Text>
          </HStack>
          <SocialMediaStack data={socialMediaData} />
        </VStack>
        <VStack
          flex={{ base: 3 }}
          height="full"
          justifyContent="center"
          alignItems="center"
        >
          <AspectRatio
            position="relative"
            ratio={3 / 4}
            width={{ base: "80%", md: "full" }}
            maxWidth={{ base: "280px", lg: "300px", "2xl": "400px" }}
            boxShadow={{
              base: `12px 12px var(--chakra-colors-brand-300)`,
              lg: `24px 24px var(--chakra-colors-brand-300)`,
            }}
            borderRadius="12px"
            transform="auto"
            translateX={{ base: "0", "2xl": "-40px" }}
          >
            <Image
              src="/profile.jpg"
              alt="Prasetya Ikra Priyadi"
              style={{ borderRadius: "12px" }}
              fill
              priority
            />
          </AspectRatio>
        </VStack>
      </Stack>
    </Section>
  );
}
