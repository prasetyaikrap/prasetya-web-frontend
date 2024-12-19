import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HttpError } from "@refinedev/core";
import { UseFormReturnType } from "@refinedev/react-hook-form";
import { Select } from "chakra-react-select";

import { publicityOptions } from "../constants";
import { ArticleData, ArticleFormFieldValues } from "../type";
import { AuthorSetting } from "./AuthorSetting";
import { FeaturedImageSetting } from "./FeaturedImageSetting";

type ArticleSettingsProps = {
  formProps: UseFormReturnType<
    ArticleData,
    HttpError,
    ArticleFormFieldValues,
    ArticleFormFieldValues,
    ArticleFormFieldValues
  >;
};

export function ArticleSettings({ formProps }: ArticleSettingsProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = formProps;
  const {
    visibility: { publicity: watchPublicity },
  } = watch();

  return (
    <Accordion allowToggle width="full">
      <AccordionItem>
        <AccordionButton>
          <HStack width="full" justifyContent="space-between">
            <Text>Additional Settings</Text>
            <AccordionIcon />
          </HStack>
        </AccordionButton>
        <AccordionPanel>
          <VStack width="full" minHeight="250px" spacing="20px">
            <SimpleGrid columns={2} spacing="40px" width="full">
              <FormControl isRequired isInvalid={Boolean(errors.slug)}>
                <FormLabel>Slug</FormLabel>
                <Input
                  {...register("slug")}
                  size="sm"
                  placeholder="Article slug..."
                />
              </FormControl>
              <FormControl isInvalid={Boolean(errors.visibility?.publicity)}>
                <FormLabel>Publicity</FormLabel>
                <Select
                  {...register("visibility.publicity")}
                  size="sm"
                  options={publicityOptions}
                  onChange={(option) => {
                    setValue("visibility.publicity", option?.value || "");
                  }}
                  value={
                    watchPublicity
                      ? publicityOptions.find(
                          (opt) => opt.value === watchPublicity
                        )
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
              <FeaturedImageSetting formProps={formProps} />
              <AuthorSetting formProps={formProps} />
            </SimpleGrid>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
