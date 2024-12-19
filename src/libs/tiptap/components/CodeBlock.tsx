import { Box } from "@chakra-ui/react";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Select, SizeProp } from "chakra-react-select";
import React from "react";

export function CodeBlock({
  editor,
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: NodeViewProps) {
  const langOptions = [
    { label: "auto", value: null },
    ...extension.options.lowlight
      .listLanguages()
      .map((lang: any) => ({ label: lang, value: lang })),
  ];
  const { isEditable } = editor;

  return (
    <Box as={NodeViewWrapper} position="relative">
      {isEditable && (
        <Select
          defaultValue={{ label: defaultLanguage, value: defaultLanguage }}
          value={{ label: defaultLanguage || "auto", value: defaultLanguage }}
          options={langOptions}
          size={"xs" as SizeProp}
          onChange={(option) => updateAttributes({ language: option?.value })}
          chakraStyles={{
            container: (provider) => ({
              ...provider,
              position: "absolute",
              backgroundColor: "white",
              right: "0.5rem",
              top: "0.5rem",
              minWidth: "125px",
              borderRadius: "20px",
            }),
            menuList: (provided) => ({ ...provided, maxH: "150px" }),
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
      )}

      <pre>
        <NodeViewContent as="code" />
      </pre>
    </Box>
  );
}
