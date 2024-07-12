import { LinkProps } from "@chakra-ui/react";

import { ChakraLink } from "@/components";
import { colorScheme } from "@/configs";

export default function NavbarButton({ children, ...props }: LinkProps) {
  return (
    <ChakraLink
      id="component_navbar-button"
      data-testid="component_navbar-button"
      paddingX="10px"
      height="full"
      href="/profile"
      color={colorScheme.monochrome[4]}
      {...props}
      _hover={{
        textDecoration: "none",
        color: colorScheme.monochrome[6],
        ...props._hover,
      }}
    >
      {children}
    </ChakraLink>
  );
}
