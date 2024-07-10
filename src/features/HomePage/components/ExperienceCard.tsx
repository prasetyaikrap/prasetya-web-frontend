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

import { colorScheme } from "@/configs";

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
          <Heading as="h4" fontSize="16px" color={colorScheme.monochrome[2]}>
            {data.title}
          </Heading>
          <Text fontSize="14px" color={colorScheme.monochrome[6]}>
            {data.period}
          </Text>
        </VStack>
      </HStack>
      <Divider />
      <Text
        width="full"
        fontSize="14px"
        color={colorScheme.monochrome[6]}
        textAlign="justify"
      >
        {data.description}
      </Text>
      <HStack width="full" flexWrap="wrap" marginTop="10px">
        {data.stacks.map((stack, i) => (
          <Tag
            key={`${stack}-${i}`}
            variant="outline"
            color={colorScheme.blue[4]}
            boxShadow={`inset 0 0 0px 1px ${colorScheme.blue[4]};`}
          >
            {stack}
          </Tag>
        ))}
      </HStack>
    </VStack>
  );
}
