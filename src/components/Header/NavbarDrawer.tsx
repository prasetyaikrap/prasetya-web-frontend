import { HamburgerIcon } from "@chakra-ui/icons";
import {
  CloseButton,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";

import { colorScheme } from "@/configs";

import ChakraLink from "../Link";
import NavbarButton from "./NavButton";
import { NavbarDrawerProps } from "./type";

export default function NavbarDrawer({ navOption }: NavbarDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  return (
    <HStack as="nav" display={{ base: "flex", sm: "none" }}>
      <IconButton
        aria-label="Drawer Navbar"
        ref={btnRef}
        icon={
          <HamburgerIcon boxSize="20px" color={colorScheme.monochrome[4]} />
        }
        variant="link"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="full"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent padding="20px">
          <VStack spacing="40px" width="full">
            <HStack
              spacing="24px"
              direction="row-reverse"
              justify="space-between"
              width="full"
            >
              <ChakraLink
                id="component_navbar-logo"
                data-testid="component_navbar-logo"
                href="/"
                fontSize="24px"
                fontFamily="var(--font-akaya)"
                color={colorScheme.navy[6]}
                _hover={{
                  textDecoration: "none",
                }}
                onClick={onClose}
              >
                Prasetya Priyadi
              </ChakraLink>
              <CloseButton onClick={onClose} />
            </HStack>
            <VStack spacing="15px" width="full">
              {navOption.map((nav) => (
                <VStack key={`nav-${nav.name}`} width="full">
                  <HStack width="full">
                    <NavbarButton
                      id={`nav-${nav.name}`}
                      data-testid={`btn_nav-${nav.name}`}
                      href={nav.path}
                      isExternal={nav.isExternal}
                      color={colorScheme.monochrome[9]}
                      _hover={{
                        color: colorScheme.monochrome[8],
                      }}
                    >
                      {nav.label}
                    </NavbarButton>
                  </HStack>
                  <Divider />
                </VStack>
              ))}
            </VStack>
          </VStack>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}
