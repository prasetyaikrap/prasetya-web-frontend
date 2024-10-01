import { Divider, HStack } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import { IconType } from "react-icons";

import { AttachmentMenus } from "./AttachmentMenu";
import { TextAligns } from "./TextAlignMenu";
import { TextFormats } from "./TextFormatsMenu";
import { TypographyMenus } from "./TypographyMenu";
import { UndoRedo } from "./UndoRedoMenu";

export type MenuBarProps = {
  editor: Editor | null;
};

export type BaseEditorProps = {
  editor: Editor;
};
export type MenuOption = {
  label: string;
  value: string;
  Icon?: IconType;
};

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  return (
    <HStack width="full" height="50px" boxShadow="base" padding="10px 20px">
      <UndoRedo editor={editor} />
      <Divider orientation="vertical" />
      <TypographyMenus editor={editor} />
      <Divider orientation="vertical" />
      <TextFormats editor={editor} />
      <Divider orientation="vertical" />
      <TextAligns editor={editor} />
      <Divider orientation="vertical" />
      <AttachmentMenus editor={editor} />
      <Divider orientation="vertical" />
    </HStack>
  );
}
