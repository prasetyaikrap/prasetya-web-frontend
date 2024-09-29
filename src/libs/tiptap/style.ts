import { SystemStyleObject } from "@chakra-ui/react";

import { colorScheme } from "@/configs";

const codeStyling: SystemStyleObject = {
  [`.hljs-comment, .hljs-quote`]: {
    color: "#616161",
  },
  [`.hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class`]: {
    color: " #f98181",
  },
  [`.hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params`]: {
    color: "#fbbc88",
  },
  [`.hljs-string,
    .hljs-symbol,
    .hljs-bullet`]: {
    color: "#b9f18d",
  },
  [`.hljs-title,
    .hljs-section`]: {
    color: "#faf594",
  },

  [`.hljs-keyword,
    .hljs-selector-tag`]: {
    color: "#70cff8",
  },

  ".hljs-emphasis": {
    fontStyle: "italic",
  },

  ".hljs-strong": {
    fontWeight: 700,
  },
};

export const editorStyle: SystemStyleObject = {
  ".tiptap": {
    flex: 1,
    padding: "20px",
    fontFamily: "inherit",
    cursor: "text",
  },
  ".tiptap h1, .tiptap h2, .tiptap h3, .tiptap h4, .tiptap h5, .tiptap h6": {
    lineHeight: "1.1",
    marginTop: "2.5rem",
    textWrap: "pretty",
    fontSize: "1rem",
    fontWeight: "semibold",
  },
  ".tiptap h1, .tiptap h2": {
    marginTop: "2.5rem",
    marginBottom: "1.5rem",
  },
  ".tiptap h1": {
    fontSize: "1.4rem",
  },
  ".tiptap h2": {
    fontSize: "1.2rem",
  },
  ".tiptap h3": {
    fontSize: "1.1rem",
  },
  ".tiptap pre": {
    bg: "black",
    borderRadius: "0.5rem",
    color: "white",
    fontFamily: "'JetBrainsMono', monospace",
    margin: "1.5rem 0",
    padding: "0.75rem 1rem",
  },
  ".tiptap code": {
    backgroundColor: "black",
    borderRadius: "0.4rem",
    color: "white",
    fontSize: " 0.85rem",
    padding: "0.25em 0.3em",
  },
  ".tiptap pre > code": {
    background: "none",
    color: "inherit",
    fontSize: "0.8rem",
    padding: 0,
  },
  ".tiptap blockquote": {
    borderLeft: `3px solid ${colorScheme.monochrome[400]}`,
    margin: "1.5rem 0",
    paddingLeft: "1rem",
  },
  ".tiptap hr": {
    border: "none",
    borderTop: `1px solid ${colorScheme.monochrome[300]}`,
    margin: "2rem 0",
  },
  ".tiptap ul, .tiptap ol": {
    padding: "0 1rem",
    margin: "1.25rem 1rem 1rem 0.4rem",
  },
  ".tiptap ul > li, .tiptap ul > p, .tiptap ol > li, .tiptap ol > p": {
    marginTop: "0.25em",
    marginBottom: "0.25em",
  },
  ".tiptap ul ul, .tiptap ul ol, .tiptap ol ul, .tiptap ol ol, ": {
    marginTop: "0.75rem",
  },
  ".tiptap p.is-editor-empty:first-of-type::before": {
    color: colorScheme.monochrome[500],
    content: "attr(data-placeholder)",
    float: "left",
    height: 0,
    pointerEvents: "none",
  },
  ".ProseMirror-focused": {
    outline: `1px solid ${colorScheme.blue[700]}`,
    borderRadius: "8px",
  },
  ".ProseMirror-selectednode figure": {
    outline: `2px solid ${colorScheme.blue[500]}`,
  },
  ...codeStyling,
};
