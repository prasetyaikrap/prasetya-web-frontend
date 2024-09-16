import { useBreakpoint, VStack } from "@chakra-ui/react";

import Sider from "./Sider";
import Title from "./Title";
import { ThemedLayoutProps } from "./type";
import { colorScheme } from "@/configs";
import { useEffect, useState } from "react";
import Header from "./Header";

export default function ThemedLayout({ children }: ThemedLayoutProps) {
  const breakpoint = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const isSmallScreen = ["sm", "md"].includes(breakpoint);

  const toggleCollapsed = (status?: boolean) => {
    setCollapsed(status ?? !collapsed);
  };

  useEffect(() => {
    setCollapsed(isSmallScreen);
  }, [breakpoint]);

  return (
    <VStack position="relative" width="full">
      <VStack
        pl={collapsed ? "80px" : "250px"}
        transition="padding ease .5s"
        width="full"
        minHeight="100vh"
        spacing="0"
      >
        <Sider
          Title={Title}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          isSmallScreen={isSmallScreen}
        />
        <Header />
        <VStack
          flex={1}
          width="full"
          position="relative"
          p="20px"
          bg={colorScheme.monochrome[200]}
        >
          {children}
        </VStack>
      </VStack>
    </VStack>
  );
}
