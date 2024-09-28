"use client";

import { VStack } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

import { colorScheme } from "@/configs";

import { MenuBar } from "./components/MenuBar";
import { useExtensions } from "./hooks/useExtensions";
import { editorStyle } from "./style";
import { TiptapEditorProps } from "./type";

export default function TiptapEditor({
  wrapperProps,
  contentProps,
}: TiptapEditorProps) {
  const extensions = useExtensions();
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
  });

  return (
    <VStack
      width="full"
      padding="20px 10px"
      flex={1}
      {...wrapperProps}
      sx={{
        ".tiptap-wrapper > div": {
          display: "flex",
          flex: 1,
          width: "100%",
        },
      }}
    >
      <MenuBar editor={editor} />
      <VStack
        flex={1}
        className="tiptap-wrapper"
        width="full"
        maxWidth="1000px"
        borderRadius="8px"
        boxShadow="base"
        outline={`1px solid ${colorScheme.monochrome[300]}`}
        {...contentProps}
        sx={{
          ...editorStyle,
          ...contentProps?.sx,
        }}
      >
        <EditorContent editor={editor} />
      </VStack>
    </VStack>
  );
}
