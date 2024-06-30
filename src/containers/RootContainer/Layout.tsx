import { Header } from "@/components";
import { Flex } from "@chakra-ui/react";
import { RootContainerLayoutProps } from "./type";

export default function Layout({ children }: RootContainerLayoutProps) {
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
        <Header />
        {children}
      </Flex>
    </Flex>
  );
}
