import { Box } from "@chakra-ui/react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Select } from "chakra-react-select";
import React from "react";

export function CodeBlock({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: any) {
  const langOptions = [
    { label: "auto", value: null },
    ...extension.options.lowlight
      .listLanguages()
      .map((lang: any) => ({ label: lang, value: lang })),
  ];

  return (
    <Box as={NodeViewWrapper} position="relative">
      <Select
        defaultValue={{ label: defaultLanguage, value: defaultLanguage }}
        value={{ label: defaultLanguage || "auto", value: defaultLanguage }}
        options={langOptions}
        size="sm"
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
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </Box>
  );
}
