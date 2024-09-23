import { Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigation, useParsed } from "@refinedev/core";

export default function NotAuthorized() {
  const { replace } = useNavigation();
  const { pathname, params } = useParsed();

  const onRelogin = () => {
    delete params?.to;
    const paramsUrl = new URLSearchParams(params).toString();
    const redirectTo = `${pathname}?${paramsUrl}`;
    const redirectUrl = `/admin/login?to=${redirectTo}`;
    replace(redirectUrl);
  };

  return (
    <VStack flex={1} width="full" bg="white" padding="80px 40px" spacing="40px">
      <Heading
        as="h3"
        fontSize="24px"
        color="brand.400"
        width="full"
        textAlign="center"
      >
        Sorry, you are not authorized to access this page
      </Heading>
      <Button width="150px" onClick={onRelogin}>
        Relogin
      </Button>
    </VStack>
  );
}
