import { LinkProps } from "@chakra-ui/react";

import { colorScheme } from "@/configs";

import ChakraLink from "../../components/Link";

export default function NavbarButton({ children, ...props }: LinkProps) {
  return (
    <ChakraLink
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
