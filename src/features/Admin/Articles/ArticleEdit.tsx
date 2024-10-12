"use client";

import { Button, Divider, HStack } from "@chakra-ui/react";
import { CanAccess } from "@refinedev/core";

import { Edit, NotAuthorized } from "@/components";

import { ArticleForm } from "./components/ArticleForm";
import { ArticleSettings } from "./components/ArticleSettings";

export default function ArticleEdit() {
  return (
    <CanAccess fallback={<NotAuthorized />}>
      <Edit
        wrapperProps={{ display: "flex", flexDirection: "column", flex: 1 }}
        contentProps={{ display: "flex", flexDirection: "column", flex: 1 }}
        footerButtonProps={{ display: "none" }}
        headerButtons={
          <HStack>
            <Button variant="outline">Preview</Button>
            <Button>Update</Button>
          </HStack>
        }
      >
        <ArticleForm />
        <Divider />
        <ArticleSettings />
      </Edit>
    </CanAccess>
  );
}
