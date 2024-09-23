import { Text, VStack } from "@chakra-ui/react";

import { ENV } from "@/configs";

export default function Footer() {
  return (
    <VStack width="full">
      <Text color="monochrome.600" fontSize="sm" textAlign="center">
        {ENV.APP_VERSION}
      </Text>
    </VStack>
  );
}
