import { Box, Text, useBreakpoint } from "@chakra-ui/react";

import { BreakpointSignalProps } from "./type";

export default function BreakpointSignal({ chakra }: BreakpointSignalProps) {
  const bp = useBreakpoint();

  return (
    <Box
      bg={{
        base: "gray",
        sm: "red",
        md: "blue",
        lg: "teal",
        xl: "blue",
        "2xl": "green",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="10px"
      {...chakra}
    >
      <Text fontSize="24px" textAlign="center" fontWeight={700} color="white">
        {bp}
      </Text>
    </Box>
  );
}
