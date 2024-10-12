import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";

import { TiptapEditor, TiptapEditorProps } from "@/libs";

export function ArticleForm() {
  const handleUpdateContent: TiptapEditorProps["onUpdateContent"] = ({
    editor,
  }) => {
    console.log(editor.getHTML());
  };

  return (
    <VStack width="full" flex={1} maxWidth="1000px" spacing="20px">
      <VStack width="full" px="10px">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input size="sm" placeholder="Your Article title..." maxLength={60} />
        </FormControl>
        <FormControl>
          <FormLabel>Excerpt</FormLabel>
          <Textarea
            size="sm"
            placeholder="Tell summary about your article..."
            maxLength={150}
            resize="none"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Slug</FormLabel>
          <Input size="sm" />
        </FormControl>
        <HStack width="full">
          <FormControl>
            <FormLabel>Category</FormLabel>
            <CreatableSelect placeholder="category..." size="sm" />
          </FormControl>
          <FormControl>
            <FormLabel>Tag</FormLabel>
            <CreatableSelect placeholder="tag..." size="sm" />
          </FormControl>
        </HStack>
      </VStack>
      <TiptapEditor onUpdateContent={handleUpdateContent} />
    </VStack>
  );
}
