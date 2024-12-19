import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DeleteButton } from "@refinedev/chakra-ui";
import { HttpError } from "@refinedev/core";
import { UseFormReturnType } from "@refinedev/react-hook-form";
import { Select } from "chakra-react-select";

import { ArticleAuthor, ArticleData, ArticleFormFieldValues } from "../type";

type AuthorSettingProps = {
  formProps: UseFormReturnType<
    ArticleData,
    HttpError,
    ArticleFormFieldValues,
    ArticleFormFieldValues,
    ArticleFormFieldValues
  >;
};

export function AuthorSetting({ formProps }: AuthorSettingProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = formProps;
  const { _selected_author: watchSelectedAuthor, author: watchAuthor } =
    watch();

  return (
    <VStack width="full" spacing="20px">
      <HStack width="full" alignItems="flex-end">
        <FormControl isInvalid={Boolean(errors.author)}>
          <FormLabel>Author</FormLabel>
          <Select
            {...register("_selected_author")}
            size="sm"
            options={[]}
            onChange={(option) => {
              const [id, email, avatar] = (option?.value || "").split("__");
              setValue("_selected_author", { id, email, avatar });
            }}
            value={
              watchSelectedAuthor
                ? {
                    label: watchSelectedAuthor.email,
                    value: `${watchSelectedAuthor.id}__${watchSelectedAuthor.email}__${watchSelectedAuthor.avatar}`,
                  }
                : null
            }
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                bg: "transparent",
                px: 2,
                cursor: "inherit",
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none",
              }),
            }}
          />
        </FormControl>
        <Button size="sm" px="40px">
          Add
        </Button>
      </HStack>
      <VStack width="full">
        {watchAuthor.map((author) => (
          <AuthorCard key={author.id} data={author} />
        ))}
      </VStack>
    </VStack>
  );
}

type AuthorCardProps = {
  data: ArticleAuthor;
};

function AuthorCard({ data }: AuthorCardProps) {
  return (
    <HStack width="full" justifyContent="space-between" px="8px">
      <HStack width="full">
        <Avatar size="sm" name={data.name} src={data.avatar} />
        <Text
          width="full"
          whiteSpace="nowrap"
          overflowX="hidden"
          textOverflow="ellipsis"
        >
          {data.name}
        </Text>
      </HStack>
      <HStack width="50px" justifyContent="center">
        <DeleteButton size="sm" hideText />
      </HStack>
    </HStack>
  );
}
