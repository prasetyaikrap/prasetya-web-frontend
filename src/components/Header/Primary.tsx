import { colorScheme } from "@/configs";
import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import ChakraLink from "../Link";
import NavbarButton from "./NavButton";
import { HamburgerIcon } from "@chakra-ui/icons";
import { isExternal } from "util/types";
import { NavigationOption } from "./type";
import NavbarBox from "./NavbarBox";
import NavbarDrawer from "./NavbarDrawer";

export default function PrimaryHeader() {
  const navigationOption: NavigationOption[] = [
    {
      name: "profiles",
      label: "Profile",
      path: "/profiles",
    },
    {
      name: "article",
      label: "Articles",
      path: "/articles",
    },
  ];

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
