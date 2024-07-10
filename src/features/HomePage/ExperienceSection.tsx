import { ChevronRightIcon } from "@chakra-ui/icons";
import { Circle, Heading, Stack, Text, VStack } from "@chakra-ui/react";

import { ChakraLink, Section } from "@/components";
import { colorScheme } from "@/configs";

import { ExperienceCard } from "./components";
import { ExperiencesData } from "./constants";

export default function ExperienceSection() {
  return (
    <Section
      chakra={{
        bg: colorScheme.navy[6],
        padding: { base: "20px", sm: "40px", md: "80px" },
      }}
    >
      <VStack width={{ base: "full", lg: "90%", xl: "80%" }}>
        <Heading
          as="h3"
          color={colorScheme.monochrome[2]}
          fontSize="32px"
          textAlign="center"
          width="full"
        >
          Experiences
        </Heading>
        <Stack
          direction={{ base: "column", lg: "row" }}
          justifyContent="center"
          width="full"
          spacing="40px"
          marginTop="40px"
        >
          <VStack
            minHeight="100px"
            alignItems={{ base: "center", lg: "flex-end" }}
          >
            <VStack width="full" maxWidth={{ base: "600px", lg: "650px" }}>
              {ExperiencesData.map((exp) => (
                <ExperienceCard key={exp.id} data={exp} />
              ))}
            </VStack>
          </VStack>
          <VStack
            alignItems={{ base: "center", lg: "flex-start" }}
            width={{ base: "full", lg: "200px" }}
          >
            <ChakraLink
              href="https://www.linkedin.com/in/prasetya-ikrapriyadi/"
              display="flex"
              flexDirection="column"
              rowGap="20px"
              flex={1}
              justifyContent="center"
              alignItems="center"
              borderRadius="12px"
              transition="all ease .5s"
              width="full"
              color={colorScheme.monochrome[6]}
              maxWidth={{ base: "400px", lg: "200px" }}
              outlineColor={colorScheme.monochrome[6]}
              target="_blank"
              _hover={{
                outlineColor: colorScheme.monochrome[2],
                color: colorScheme.monochrome[2],
              }}
            >
              <Circle
                borderRadius="50%"
                borderWidth="1px"
                borderColor={colorScheme.monochrome[2]}
                display={{ base: "none", lg: "initial" }}
              >
                <ChevronRightIcon boxSize="50px" />
              </Circle>
              <Text fontWeight={700}>View Full Resume</Text>
            </ChakraLink>
          </VStack>
        </Stack>
      </VStack>
    </Section>
  );
}
