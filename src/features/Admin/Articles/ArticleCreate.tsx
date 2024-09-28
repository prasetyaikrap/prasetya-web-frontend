"use client";
import { VStack } from "@chakra-ui/react";

import { Create } from "@/components";
import { TiptapEditor } from "@/libs";

export default function ArticleCreate() {
  return (
    <Create
      wrapperProps={{ display: "flex", flexDirection: "column", flex: 1 }}
      contentProps={{ display: "flex", flexDirection: "column", flex: 1 }}
      footerButtonProps={{ display: "none" }}
    >
      <VStack width="full" flex={1}>
        <TiptapEditor />
      </VStack>
    </Create>
  );
}
