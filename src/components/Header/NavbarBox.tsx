import { HStack } from "@chakra-ui/react";
import { NavbarBoxProps } from "./type";
import NavbarButton from "./NavButton";

export default function NavbarBox({ navOption }: NavbarBoxProps) {
  return (
    <HStack
      id="component_navbar-box"
      data-testid="component_navbar-box"
      as="nav"
      spacing="20px"
      display={{ base: "none", sm: "flex" }}
    >
      {navOption.map((nav) => (
        <NavbarButton
          key={`nav-${nav.name}`}
          id={`nav-${nav.name}`}
          data-testid={`btn_nav-${nav.name}`}
          href={nav.path}
          isExternal={nav.isExternal}
        >
          {nav.label}
        </NavbarButton>
      ))}
    </HStack>
  );
}
