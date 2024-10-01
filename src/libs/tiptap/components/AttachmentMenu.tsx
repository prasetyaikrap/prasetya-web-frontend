import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdImage, MdInsertLink } from "react-icons/md";

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

  const {
    isOpen: isOpenLink,
    onOpen: onOpenLink,
    onClose: onCloseLink,
  } = useDisclosure();
  const [linkForm, setLinkForm] = useState({ label: "", link: "" });
  const isLinkActive = editor.isActive("link");

  const handleInsertLink = useCallback(() => {
    const { label, link } = linkForm;
    const { from, to } = editor.state.selection;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: link })
      .run();
    editor.chain().focus().insertContentAt({ from, to }, label).run();
    onCloseLink();
  }, [linkForm, editor, onCloseLink]);

  const handleUnsetLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkForm({ label: "", link: "" });
    onCloseLink();
  };
  const { selection } = editor.state;

  useEffect(() => {
    const { from, to } = selection;
    const linkLabel = editor.state.doc.textBetween(from, to);
    const linkUrl = editor.getAttributes("link").href || "";

    return setLinkForm({ label: linkLabel, link: linkUrl });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  return (
    <HStack>
      <FileUpload
        accept="image/*"
        render={<MdImage size="20px" />}
        maxSize={1}
        onUploadFile={handleImageUpload}
      />
      <Popover
        isLazy
        placement="bottom-start"
        closeOnBlur={false}
        returnFocusOnClose={false}
        isOpen={isOpenLink}
        onOpen={onOpenLink}
        onClose={onCloseLink}
      >
        <PopoverTrigger>
          <IconButton
            aria-label="anchor-link"
            size="sm"
            variant="ghost"
            icon={<MdInsertLink size="20px" />}
          />
        </PopoverTrigger>
        <PopoverContent width="max-content">
          <PopoverBody width="max-content" p="8px">
            <VStack width="250px">
              <FormControl>
                <FormLabel fontSize="xs" fontWeight={700}>
                  Link
                </FormLabel>
                <Input
                  size="xs"
                  type="url"
                  value={linkForm.link}
                  onChange={(e) =>
                    setLinkForm((prev) => ({
                      ...prev,
                      link: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="xs" fontWeight={700}>
                  Text to display
                </FormLabel>
                <Input
                  size="xs"
                  value={linkForm.label}
                  onChange={(e) =>
                    setLinkForm((prev) => ({
                      ...prev,
                      label: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <HStack width="full" justifyContent="space-between">
                <HStack>
                  {isLinkActive && (
                    <Button size="xs" variant="ghost" onClick={handleUnsetLink}>
                      Unlink
                    </Button>
                  )}
                </HStack>
                <HStack>
                  <Button size="xs" variant="ghost" onClick={onCloseLink}>
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    isDisabled={!linkForm.link}
                    onClick={handleInsertLink}
                  >
                    Insert
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  );
}
