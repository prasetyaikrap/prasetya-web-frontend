import { LinkProps } from "@chakra-ui/react";

import { ChakraLink } from "@/components";

export default function NavbarButton({ children, ...props }: LinkProps) {
  return (
    <ChakraLink
      id="component_navbar-button"
      data-testid="component_navbar-button"
      paddingX="10px"
      height="full"
      href="/profile"
      color="monochrome.400"
      {...props}
      _hover={{
        textDecoration: "none",
        color: "monochrome.600",
        ...props._hover,
      }}
    >
      {children}
    </ChakraLink>
  );
}
