import {
  AspectRatio,
  Box,
  Center,
  FormControl,
  FormLabel,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HttpError } from "@refinedev/core";
import { UseFormReturnType } from "@refinedev/react-hook-form";

import { FileUpload } from "@/components";

import { ArticleData, ArticleFormFieldValues } from "../type";

type FeaturedImageSettingProps = {
  formProps: UseFormReturnType<
    ArticleData,
    HttpError,
    ArticleFormFieldValues,
    ArticleFormFieldValues,
    ArticleFormFieldValues
  >;
};

export function FeaturedImageSetting({ formProps }: FeaturedImageSettingProps) {
  const {
    formState: { errors },
    watch,
    setValue,
  } = formProps;
  const { featuredImage: watchFeaturedImage, title: watchTitle } = watch();

  return (
    <VStack width="full">
      <FormControl isInvalid={Boolean(errors.featuredImage)}>
        <FormLabel>Featured Image</FormLabel>
        <AspectRatio mb="8px" maxHeight="250px" ratio={4 / 3}>
          <Image
            src={watchFeaturedImage}
            alt={watchTitle}
            fallback={
              <Center bg="monochrome.300" borderRadius="8px">
                <Text color="monochrome.600" fontSize="sm">
                  No Featured Image
                </Text>
              </Center>
            }
            objectFit="contain"
          />
        </AspectRatio>
        <FileUpload
          accept="image/*"
          render={
            <Text
              width="80%"
              textAlign="center"
              bg="brand.500"
              color="white"
              borderRadius="8px"
              p="8px"
            >
              Upload Image
            </Text>
          }
          maxSize={1}
          onUploadFile={() => {}}
        />
      </FormControl>
    </VStack>
  );
}
