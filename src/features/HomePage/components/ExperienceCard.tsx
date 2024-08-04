import {
  AspectRatio,
  Divider,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ExperienceCardProps } from "../type";

export default function ExperienceCard({ data }: ExperienceCardProps) {
  const router = useRouter();
  return (
    <VStack
      width="full"
      padding="20px"
      borderRadius="12px"
      transition="all ease .5s"
      _hover={{
        boxShadow: "dark-lg",
      }}
      onClick={() => {
        if (!data.link?.url) return;
        if (data.link?.isExternal) {
          return window.open(data.link?.url);
        }
        return router.push(data.link?.url);
      }}
      cursor="pointer"
    >
      <HStack spacing="10px" width="full">
        <AspectRatio position="relative" ratio={1 / 1} width="40px">
          <Image src={data.img} alt={data.title} fill priority />
        </AspectRatio>
        <VStack flex={1} alignItems="flex-start" spacing="5px">
          <Heading as="h4" fontSize="16px" color="monochrome.200">
            {data.title}
          </Heading>
          <Text fontSize="14px" color="monochrome.600">
            {data.period}
          </Text>
        </VStack>
      </HStack>
      <Divider />
      <Text
        width="full"
        fontSize="14px"
        color="monochrome.400"
        textAlign="justify"
      >
        {data.description}
      </Text>
      <HStack width="full" flexWrap="wrap" marginTop="10px">
        {data.stacks.map((stack, i) => (
          <Tag
            key={`${stack}-${i}`}
            variant="outline"
            color="blue.400"
            boxShadow={`inset 0 0 0px 1px var(--chakra-colors-blue-400);`}
          >
            {stack}
          </Tag>
        ))}
      </HStack>
    </VStack>
  );
}
