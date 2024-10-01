import TCodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TLink from "@tiptap/extension-link";
import TPlaceholder from "@tiptap/extension-placeholder";
import TSubscript from "@tiptap/extension-subscript";
import TSuperscript from "@tiptap/extension-superscript";
import TTextAlign from "@tiptap/extension-text-align";
import TTypography from "@tiptap/extension-typography";
import TUnderline from "@tiptap/extension-underline";
import { Extensions, ReactNodeViewRenderer } from "@tiptap/react";
import TStarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";

import { CodeBlock } from "../components/CodeBlock";
import { ChakraImage } from "../components/ImageExtension";

export function useExtensions(): Extensions {
  const ExtendedStarterKit = TStarterKit.configure({
    bulletList: {
      keepMarks: true,
    },
    orderedList: {
      keepMarks: true,
    },
    codeBlock: false,
    dropcursor: {
      color: "#ff0000",
    },
  });

  const ExtendedPlaceholder = TPlaceholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "What’s the title?";
      }

      return "Write something...";
    },
  });

  const ExtendedTextAlign = TTextAlign.configure({
    types: ["heading", "paragraph"],
  });
  const lowlight = createLowlight(all);
  const ExtendedCodeBlockLowLight = TCodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlock);
    },
  }).configure({ lowlight });

  const ExtendedLink = TLink.configure({
    defaultProtocol: "https",
    HTMLAttributes: {
      rel: "noopener noreferrer",
    },
  });

  return [
    ExtendedStarterKit,
    ExtendedPlaceholder,
    ExtendedTextAlign,
    TTypography,
    ExtendedCodeBlockLowLight,
    TUnderline,
    TSubscript,
    TSuperscript,
    ChakraImage,
    ExtendedLink,
  ];
}
