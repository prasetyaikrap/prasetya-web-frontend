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
import { HttpError, useLogin, useParsed } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

import { PostLoginAdminSuccessResponse } from "@/libs/providers/dataProvider/appApiSchema";

import { formLoginSchema } from "./constant";
import { FormLoginFields } from "./type";

export default function LoginForm() {
  const { params } = useParsed();
  const [errorBadge, setErrorBadge] = useState("");
  const { mutate: login } = useLogin();
  const [defaultValues, setDefaultValues] = useState<FormLoginFields>({
    username: "",
    password: "",
    remember_me: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<
    PostLoginAdminSuccessResponse["data"],
    HttpError,
    FormLoginFields
  >({
    refineCoreProps: {
      resource: "loginAdmin",
      queryOptions: {
        enabled: false,
      },
    },
    resolver: zodResolver(formLoginSchema),
    defaultValues,
    values: defaultValues,
  });
  const { remember_me } = watch();

  const onSubmit = async (data: FormLoginFields) => {
    const { username, password, remember_me } = data;
    if (remember_me) {
      localStorage.setItem(
        "app_remember_me",
        JSON.stringify({ username, remember_me })
      );
    }

    login(
      { username, password, redirectPath: params?.to || "/admin" },
      {
        onError(error) {
          const { statusCode } = error as HttpError;
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
      }
    );
  };

  useEffect(() => {
    const rememberMeCache = localStorage.getItem("app_remember_me") || "{}";
    const { username, remember_me } = JSON.parse(rememberMeCache);
    setDefaultValues((prev) => ({ ...prev, username, remember_me }));
  }, []);

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
          isChecked={remember_me}
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
