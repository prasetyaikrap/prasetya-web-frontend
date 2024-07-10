import { HStack } from "@chakra-ui/react";

import { colorScheme } from "@/configs";

import ChakraLink from "../../components/Link";
import { navigationOption } from "./constants/navOptions";
import NavbarBox from "./NavbarBox";
import NavbarDrawer from "./NavbarDrawer";

export default function PrimaryHeader() {
  return (
    <HStack
      id="component_navbar-container"
      data-testid="component_navbar-container"
      height={{ base: "80px", md: "100px" }}
      paddingX={{ base: "20px", sm: "40px", md: "80px" }}
      bg={colorScheme.navy[6]}
      justifyContent="space-between"
    >
      <ChakraLink
        id="component_navbar-logo"
        data-testid="component_navbar-logo"
        href="/"
        fontSize={{ base: "18px", md: "24px" }}
        fontFamily="var(--font-akaya)"
        color={colorScheme.monochrome[4]}
        _hover={{
          textDecoration: "none",
        }}
      >
        Prasetya Priyadi
      </ChakraLink>
      <NavbarBox navOption={navigationOption} />
      <NavbarDrawer navOption={navigationOption} />
    </HStack>
  );
}
