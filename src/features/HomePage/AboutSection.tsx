import { Heading, Text, VStack } from "@chakra-ui/react";

import { ChakraLink, Section } from "@/components";

export default function AboutSection() {
  return (
    <Section
      chakra={{
        bg: "brand.600",
        padding: { base: "20px", sm: "40px", md: "80px" },
      }}
    >
      <VStack width={{ base: "full", lg: "90%", xl: "80%" }}>
        <Heading
          as="h3"
          color="monochrome.200"
          fontSize="32px"
          textAlign="center"
          marginBottom="40px"
        >
          Become a Dedicated Full Stack Software Developer
        </Heading>
        <Text color="monochrome.200" fontSize="16px" textAlign="justify">
          Back in 2020, Covid-19 Pandemic really changing all of us, including
          me. Graduated from Geological Engineering, Padjadjaran University,
          Jatinangor, West Jave, Indonesia in 2019, but decided to pivot my
          career into Technology Industry. After that challenging season, for
          over 2 years of learning something new about Web Development, lead me
          into these point to pursue my career as a full-fledged Software
          Developer
        </Text>
        <Text color="monochrome.200" fontSize="16px" textAlign="justify">
          Currently, I am focusing to building accessible and exceptional user
          interface for our customer at{" "}
          <ChakraLink fontWeight={700} href="https://efishery.com" isExternal>
            eFishery
          </ChakraLink>
          , one of the biggest AquaCulture Technology Company in Indonesia.{" "}
          <Text as="span" fontWeight={700}>
            Managing several Customer-facing Apps and Company Internall Apps
          </Text>{" "}
          for better and efficient stackholder workflow. I find great
          satisfaction in creating software that colaborate of design and
          engineering. My passion lies in developing solutions that are not only{" "}
          <Text as="span" color="monochrome.200" fontWeight={700}>
            visually appealing but also meticulously crafted for optimal
            performance
          </Text>
        </Text>
        <Text color="monochrome.200" fontSize="16px" textAlign="justify">
          At my free time, I try to share my knowledge back to the community.
          Actively as contributor at some Developer Community on Discord,
          publishing my{" "}
          <ChakraLink href="/articles" fontWeight={700}>
            Articles
          </ChakraLink>{" "}
          and also release some stress by enjoying play Online Video Games,
          it&apos;s obvious right?!?
        </Text>
      </VStack>
    </Section>
  );
}
