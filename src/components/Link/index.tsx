import { LinkProps, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function ChakraLink({ children, ...props }: LinkProps) {
  return (
    <Link as={NextLink} {...props}>
      {children}
    </Link>
  );
}
