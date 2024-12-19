"use client";

import { Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CanAccess, HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { Edit, NotAuthorized } from "@/components";

import { ArticleForm } from "./components/ArticleForm";
import { articleFormSchema } from "./constants";
import { ArticleData, ArticleFormFieldValues } from "./type";

export default function ArticleEdit() {
  const defaultValues: ArticleFormFieldValues = {
    id: "",
    title: "",
    summary: "",
    slug: "",
    categories: [],
    tags: [],
    featuredImage: "",
    content: "",
    visibility: {
      publicity: "public",
      status: "not_published",
    },
    author: [
      {
        id: "user-1",
        name: "Prasetya Ikra Priyadi",
        email: "prasetya.ikrapriyadi@gmail.com",
        avatar: "https://bit.ly/dan-abramov",
      },
      {
        id: "user-2",
        name: "Prasetya Ikra Priyadi",
        email: "prasetya.ikrapriyadi@gmail.com",
        avatar: "https://bit.ly/dan-abramov",
      },
      {
        id: "user-3",
        name: "Prasetya Ikra Priyadi",
        email: "prasetya.ikrapriyadi@gmail.com",
        avatar: "https://bit.ly/dan-abramov",
      },
    ],
    modified_at: "",
    created_at: "",
    created_by: "",
    modified_by: "",
  };

  const formProps = useForm<
    ArticleData,
    HttpError,
    ArticleFormFieldValues,
    ArticleFormFieldValues,
    ArticleFormFieldValues
  >({
    refineCoreProps: {
      resource: "articles",
      action: "edit",
      queryOptions: {
        enabled: false,
      },
    },
    resolver: zodResolver(articleFormSchema),
    defaultValues,
  });

  return (
    <CanAccess fallback={<NotAuthorized />}>
      <Edit
        wrapperProps={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          as: "form",
        }}
        contentProps={{ display: "flex", flexDirection: "column", flex: 1 }}
        footerButtonProps={{ display: "none" }}
        headerButtons={
          <HStack>
            <ButtonGroup size="sm" isAttached>
              <Button variant="outline">Preview</Button>
              <Button variant="outline">Update</Button>
            </ButtonGroup>
            <Button size="sm">Publish</Button>
          </HStack>
        }
      >
        <ArticleForm formProps={formProps} />
      </Edit>
    </CanAccess>
  );
}
