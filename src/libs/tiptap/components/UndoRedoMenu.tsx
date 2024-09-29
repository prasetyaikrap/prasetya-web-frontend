import { HStack, IconButton } from "@chakra-ui/react";
import { MdRedo, MdUndo } from "react-icons/md";

import { BaseEditorProps } from "./MenuBar";

type UndoRedoProps = BaseEditorProps;
export function UndoRedo({ editor }: UndoRedoProps) {
  return (
    <HStack>
      <IconButton
        size="sm"
        aria-label="undo"
        variant="ghost"
        icon={<MdUndo />}
        isDisabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <IconButton
        size="sm"
        aria-label="redo"
        variant="ghost"
        icon={<MdRedo />}
        isDisabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      />
    </HStack>
  );
}
