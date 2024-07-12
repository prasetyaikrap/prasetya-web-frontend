"use client";
import { Flex } from "@chakra-ui/react";

import { Footer, Header } from "@/features";

import BodyContainer from "./BodyContainer";
import { RootContainerLayoutProps } from "./type";

export default function GeneralLayout({
  children,
  header,
  footer,
}: RootContainerLayoutProps) {
  return (
    <Flex direction="column" alignItems="center" bg="black">
      <Flex
        position="relative"
        minHeight="100vh"
        direction="column"
        bg="white"
        width="full"
        maxWidth="2560px"
      >
        <Header header={header} />
        <BodyContainer>{children}</BodyContainer>
        <Footer footer={footer} />
      </Flex>
    </Flex>
  );
}
