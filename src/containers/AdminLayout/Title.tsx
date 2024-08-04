import { Heading, HStack, Image, Link } from "@chakra-ui/react";
import { TitleProps } from "@refinedev/core";
import NextLink from "next/link";

export default function Title({ collapsed }: TitleProps) {
  return (
    <Link
      as={NextLink}
      href="/"
      target="_blank"
      textDecoration="none"
      _hover={{
        textDecoration: "none",
      }}
    >
      <HStack>
        <Image
          src="/fox-prasetya.png"
          alt="Prasetya Priyadi"
          boxSize="40px"
          bg="brand.700"
          borderRadius="full"
        />
        {!collapsed && (
          <Heading fontFamily="var(--font-akaya)" as="h1" fontSize="18px">
            Prasetya Priyadi
          </Heading>
        )}
      </HStack>
    </Link>
  );
}
