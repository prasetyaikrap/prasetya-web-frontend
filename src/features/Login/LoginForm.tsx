import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpError, useNavigation, useParsed } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useState } from "react";
import { match } from "ts-pattern";

import { PostLoginAdminSuccessResponse } from "@/libs/providers/dataProvider/appApiSchema";
import { setCookies } from "@/utils";

import { formLoginSchema } from "./constant";
import { FormLoginFields } from "./type";

export default function LoginForm() {
  const { replace } = useNavigation();
  const { params } = useParsed();
  const [errorBadge, setErrorBadge] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    refineCore: { onFinish },
  } = useForm<
    PostLoginAdminSuccessResponse["data"],
    HttpError,
    FormLoginFields
  >({
    refineCoreProps: {
      resource: "loginAdmin",
      action: "create",
      async onMutationSuccess(data) {
        const {
          data: { accessToken, accessTokenKey, refreshToken, refreshTokenKey },
        } = data;

        await setCookies([
          {
            name: accessTokenKey,
            value: accessToken,
            path: "/",
            httpOnly: true,
            secure: true,
          },
          {
            name: refreshTokenKey,
            value: refreshToken,
            path: "/",
            httpOnly: true,
            secure: true,
          },
        ]);

        replace(params?.to || "/admin");
      },
      async onMutationError(error) {
        const { statusCode } = error;
        match(statusCode)
          .with(401, () =>
            setErrorBadge("Login Failed. Username and/or Password Wrong")
          )
          .with(404, () =>
            setErrorBadge("Login Failed. Admin user is not registered")
          )
          .otherwise(() =>
            setErrorBadge("Something Went Wrong. Try again later...")
          );
      },
    },
    resolver: zodResolver(formLoginSchema),
  });

  const onSubmit = async (data: FormLoginFields) => {
    const { username, password, remember_me } = data;
    if (remember_me) {
      localStorage.setItem(
        "app_remember_me",
        JSON.stringify({ username, remember_me })
      );
    }
    await onFinish({ username, password });
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      width="full"
      minHeight="300px"
      marginTop="20px"
    >
      {errorBadge && (
        <Text
          width="80%"
          textAlign="center"
          padding="10px 20px"
          borderRadius="5px"
          marginBottom="10px"
          fontSize="sm"
          bg="red.100"
        >
          {errorBadge}
        </Text>
      )}
      <FormControl isRequired isInvalid={Boolean(errors.username)}>
        <FormLabel>Username / Email</FormLabel>
        <Input {...register("username")} />
      </FormControl>
      <FormControl isRequired isInvalid={Boolean(errors.password)}>
        <FormLabel>Password</FormLabel>
        <Input {...register("password")} type="password" />
      </FormControl>
      <FormControl>
        <Checkbox
          {...register("remember_me")}
          padding="5px 10px"
          colorScheme="brand"
        >
          Remember me
        </Checkbox>
      </FormControl>
      <Button type="submit" width="75%" marginTop="20px" borderRadius="8px">
        Login
      </Button>
    </VStack>
  );
}
