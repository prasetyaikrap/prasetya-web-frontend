import { HStack, useToast } from "@chakra-ui/react";
import { MdImage } from "react-icons/md";

import { FileUpload } from "@/components";
import { UploadFileCallbackProps } from "@/components/FileUpload";

import { BaseEditorProps } from "./MenuBar";

type AttachmentMenusProps = BaseEditorProps;
export function AttachmentMenus({ editor }: AttachmentMenusProps) {
  const toast = useToast();
  const handleImageUpload = ({
    success,
    file,
    src,
    error,
  }: UploadFileCallbackProps) => {
    if (!success) {
      toast({
        title: "Failed to Upload",
        description: error || "",
        status: "error",
        duration: 5000,
        position: "top-right",
      });
    }

    editor
      .chain()
      .focus()
      .setImage({ src: src as string, alt: "contoh-image", title: file.name })
      .run();
  };

  return (
    <HStack>
      <FileUpload
        accept="image/*"
        render={<MdImage size="20px" />}
        maxSize={1}
        onUploadFile={handleImageUpload}
      />
    </HStack>
  );
}
