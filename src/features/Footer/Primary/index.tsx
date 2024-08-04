import { HStack, Stack, Text, VStack } from "@chakra-ui/react";

export default function PrimaryFooter() {
  return (
    <VStack
      width="full"
      paddingX={{ base: "20px", sm: "40px", md: "80px" }}
      paddingY="40px"
      bg="brand.600"
    >
      <Stack
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
        width="full"
      >
        <HStack flex={1}></HStack>
        <VStack
          flex={1}
          maxWidth={{ base: "unset", md: "300px" }}
          alignItems={{ base: "center", md: "flex-end" }}
        >
          <Text
            textAlign={{ base: "center", md: "right" }}
            fontSize="14px"
            color="monochrome.600"
          >
            Built with Next.js and Chakra UI, deployed with Vercel. All text is
            set in the Inter typeface.
          </Text>
          <Text
            textAlign={{ base: "center", md: "right" }}
            fontSize="14px"
            color="monochrome.600"
          >
            {`Copyright ${new Date().getFullYear()} | Prasetya Ikra Priyadi`}
          </Text>
        </VStack>
      </Stack>
    </VStack>
  );
}
