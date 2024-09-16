import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Tooltip,
  useBreakpoint,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { CSSProperties } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { colorScheme } from "@/configs";

import { SiderProps, TreeViewProps } from "./type";
import { CanAccess, useLink, useMenu } from "@refinedev/core";

export default function Sider({
  Title,
  activeItemDisabled = false,
  collapsed,
  toggleCollapsed,
  isSmallScreen,
}: SiderProps) {
  const Link = useLink();
  const { menuItems, defaultOpenKeys, selectedKey } = useMenu();

  const handleCollapsedChange = () => {
    toggleCollapsed(!collapsed);
  };

  return (
    <VStack
      py="20px"
      flex={1}
      position="fixed"
      w={collapsed ? "80px" : "250px"}
      h="100vh"
      left="0"
      top="0"
      boxShadow="md"
      transition="width ease .5s"
      zIndex="9999"
      bg="white"
    >
      <Flex
        width="full"
        justifyContent={collapsed ? "center" : "unset"}
        padding={collapsed ? "20px 10px" : "20px"}
      >
        <Title collapsed={collapsed} />
      </Flex>
      {isSmallScreen && (
        <Circle
          p="4px"
          border={`1px solid ${colorScheme.monochrome[400]}`}
          position="absolute"
          top="8px"
          right="-15px"
          zIndex="99999"
          cursor="pointer"
          transition="all ease .5s"
          bg="white"
          _hover={{
            bg: colorScheme.monochrome[300],
          }}
          onClick={handleCollapsedChange}
        >
          {collapsed && (
            <MdChevronRight color={colorScheme.navy[700]} size="20px" />
          )}
          {!collapsed && (
            <MdChevronLeft color={colorScheme.navy[700]} size="20px" />
          )}
        </Circle>
      )}
      <VStack width="full">
        <RenderTreeView
          menuItems={menuItems}
          selectedKey={selectedKey}
          defaultOpenKeys={defaultOpenKeys}
          collapsed={collapsed}
          activeItemDisabled={activeItemDisabled}
          Link={Link}
        />
      </VStack>
    </VStack>
  );
}

function RenderTreeView({
  menuItems,
  defaultOpenKeys,
  selectedKey,
  activeItemDisabled,
  collapsed,
  Link,
}: TreeViewProps) {
  return menuItems.map((item) => {
    const { label, route, name, icon, children } = item;

    const isSelected = item.key === selectedKey;
    const isParent = children.length > 0;

    const linkProps = !isParent
      ? {
          as: Link,
          to: route,
        }
      : undefined;

    const linkStyle: CSSProperties =
      activeItemDisabled && isSelected ? { pointerEvents: "none" } : {};

    return (
      <CanAccess
        key={item.key}
        resource={name}
        action="list"
        params={{
          resource: item,
        }}
      >
        <Accordion
          defaultIndex={defaultOpenKeys.includes(item.key || "") ? 0 : -1}
          width="full"
          mb={2}
          allowToggle
        >
          <AccordionItem border="none">
            <Tooltip label={label}>
              <AccordionButton
                px={0}
                py={0}
                as="div"
                width="full"
                _hover={{
                  backgroundColor: "transparent",
                }}
              >
                <Button
                  colorScheme={isSelected ? "brand" : "gray"}
                  borderRadius={0}
                  pl={collapsed ? 6 : 5}
                  width="full"
                  variant="ghost"
                  fontWeight="normal"
                  leftIcon={icon as any}
                  rightIcon={
                    isParent ? <AccordionIcon color="brand.100" /> : undefined
                  }
                  _active={{
                    _before: {
                      content: "''",
                      bgColor: useColorModeValue("brand.200", "brand.200"),
                      opacity: 0.05,
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      width: "100%",
                      height: "100%",
                    },
                    borderRight: "4px",
                    borderRightColor: "brand.200",
                  }}
                  isActive={isSelected}
                  style={linkStyle}
                  {...linkProps}
                >
                  {!collapsed && (
                    <Box flexGrow={1} textAlign="left">
                      {label}
                    </Box>
                  )}
                </Button>
              </AccordionButton>
            </Tooltip>

            {isParent && (
              <AccordionPanel p={0} pl={collapsed ? 0 : 4}>
                <Accordion width="full" allowToggle>
                  <RenderTreeView
                    menuItems={children}
                    selectedKey={selectedKey}
                    defaultOpenKeys={defaultOpenKeys}
                    collapsed={collapsed}
                    activeItemDisabled={activeItemDisabled}
                    Link={Link}
                  />
                </Accordion>
              </AccordionPanel>
            )}
          </AccordionItem>
        </Accordion>
      </CanAccess>
    );
  });
}
