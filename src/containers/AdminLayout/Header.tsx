import { Box, Button, HStack } from "@chakra-ui/react";
import { useLogout } from "@refinedev/core";

export default function Header() {
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout({ redirectPath: "/admin/login" });
  };
  return (
    <HStack
      width="full"
      minH="80px"
      boxShadow="base"
      justifyContent="space-between"
      padding="10px 80px 10px 40px"
    >
      <Box />
      <HStack justifyContent="flex-end">
        <Button onClick={handleLogout}>Logout</Button>
      </HStack>
    </HStack>
  );
}
