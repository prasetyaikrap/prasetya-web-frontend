"use client";
import { Center, Heading, VStack } from "@chakra-ui/react";

import { colorScheme } from "@/configs";

import Footer from "./Footer";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Center width="full" height="100vh">
      <VStack
        width="450px"
        minHeight="500px"
        boxShadow="lg"
        borderRadius="8px"
        border={`1px solid ${colorScheme.monochrome[200]}`}
        padding="40px"
        spacing="10px"
      >
        <Heading as="h1" fontSize="32px">
          Sign to Admin Panel
        </Heading>
        <LoginForm />
        <Footer />
      </VStack>
    </Center>
  );
}
