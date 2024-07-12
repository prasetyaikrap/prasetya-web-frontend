import { VStack } from "@chakra-ui/react";

import { BodyContainerProps } from "./type";

export default function BodyContainer({
  children,
  chakra,
}: BodyContainerProps) {
  return (
    <VStack
      id="component_body-container"
      data-testid="component_body-container"
      flex="1"
      width="full"
      spacing="0"
      {...chakra}
    >
      {children}
    </VStack>
  );
}
