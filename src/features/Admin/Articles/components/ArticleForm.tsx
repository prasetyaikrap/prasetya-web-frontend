import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { HttpError } from "@refinedev/core";
import { UseFormReturnType } from "@refinedev/react-hook-form";
import { CreatableSelect } from "chakra-react-select";

import { TiptapEditor, TiptapEditorProps } from "@/libs";

import { ArticleData, ArticleFormFieldValues } from "../type";
import { ArticleSettings } from "./ArticleSettings";
import { normalizeToSlug } from "@/utils";

export type ArticleFormProps = {
  formProps: UseFormReturnType<
    ArticleData,
    HttpError,
    ArticleFormFieldValues,
    ArticleFormFieldValues,
    ArticleFormFieldValues
  >;
};

export function ArticleForm({ formProps }: ArticleFormProps) {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = formProps;

  const { categories: watchCategories, tags: watchTags } = watch();

  const handleUpdateContent: TiptapEditorProps["onUpdateContent"] = ({
    editor,
  }) => {
    const htmlContent = editor.getHTML();
    setValue("content", htmlContent);
  };

  return (
    <VStack width="full" flex={1} maxWidth="1000px" spacing="20px">
      <VStack width="full" px="10px">
        <FormControl isRequired isInvalid={Boolean(errors.title)}>
          <FormLabel>Title</FormLabel>
          <Input
            {...register("title")}
            onChange={(e) => {
              const value = e.currentTarget.value;
              const normalizeSlug = normalizeToSlug(value);
              setValue("title", value);
              setValue("slug", normalizeSlug);
            }}
            size="sm"
            placeholder="Your Article title..."
            maxLength={60}
          />
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(errors.summary)}>
          <FormLabel>Summary</FormLabel>
          <Textarea
            {...register("summary")}
            size="sm"
            placeholder="Tell summary about your article..."
            maxLength={300}
            resize="none"
          />
        </FormControl>
        <SimpleGrid columns={3} spacing="20px" width="full">
          <FormControl isInvalid={Boolean(errors.categories)}>
            <FormLabel>Category</FormLabel>
            <CreatableSelect
              {...register("categories")}
              isMulti
              placeholder="categories..."
              size="sm"
              options={[]}
              onChange={(options) => {
                setValue(
                  "categories",
                  options.map((opt) => ({ id: opt.value, value: opt.label }))
                );
              }}
              value={watchCategories.map((cat) => ({
                label: cat.value,
                value: cat.id,
              }))}
              onCreateOption={(inputValue) => {
                const currentCategories = getValues().categories;
                setValue("categories", [
                  ...currentCategories,
                  { id: `cat_create_${inputValue}`, value: inputValue },
                ]);
              }}
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
          <FormControl isInvalid={Boolean(errors.tags)}>
            <FormLabel>Tag</FormLabel>
            <CreatableSelect
              {...register("tags")}
              isMulti
              placeholder="tags..."
              size="sm"
              options={[]}
              onChange={(options) => {
                setValue(
                  "tags",
                  options.map((opt) => ({ id: opt.value, value: opt.label }))
                );
              }}
              value={watchTags.map((tag) => ({
                label: tag.value,
                value: tag.id,
              }))}
              onCreateOption={(inputValue) => {
                const currentCategories = getValues().tags;
                setValue("tags", [
                  ...currentCategories,
                  { id: `tag_create_${inputValue}`, value: inputValue },
                ]);
              }}
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
        </SimpleGrid>
      </VStack>
      <VStack width="full" px="10px">
        <ArticleSettings formProps={formProps} />
      </VStack>
      <FormControl isInvalid={Boolean(errors.content)}>
        <TiptapEditor
          onUpdateContent={handleUpdateContent}
          contentProps={{ minHeight: "600px" }}
        />
      </FormControl>
    </VStack>
  );
}
