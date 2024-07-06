import { VStack } from "@chakra-ui/react";

import { SectionProps } from "./type";

export default function Section({ children, chakra }: SectionProps) {
  return (
    <VStack
      position="relative"
      padding="80px"
      minHeight="200px"
      width="full"
      {...chakra}
    >
      {children}
    </VStack>
  );
}
