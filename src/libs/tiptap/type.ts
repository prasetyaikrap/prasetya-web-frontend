import { BoxProps, StackProps } from "@chakra-ui/react";
import { Content, EditorEvents } from "@tiptap/react";

export type TiptapEditorProps = {
  wrapperProps?: StackProps;
  contentProps?: BoxProps;
  editable?: boolean;
  onUpdateContent?: (props: EditorEvents["update"]) => void;
  content?: Content;
};
