import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa6";
import { LuTextQuote } from "react-icons/lu";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";

import { colorScheme } from "@/configs";

import { BaseEditorProps, MenuOption } from "./MenuBar";

type TextAlignsProps = BaseEditorProps;
export function TextAligns({ editor }: TextAlignsProps) {
  const menuOptions: MenuOption[] = [
    {
      label: "Align Left",
      value: "left",
      Icon: FaAlignLeft,
    },
    {
      label: "Align Center",
      value: "center",
      Icon: FaAlignCenter,
    },
    {
      label: "Align Right",
      value: "right",
      Icon: FaAlignRight,
    },
    {
      label: "Align Justify",
      value: "justify",
      Icon: FaAlignJustify,
    },
  ];
  const [selectedMenu, setSelectedMenu] = useState<MenuOption>(menuOptions[0]);

  return (
    <HStack>
      <Popover isLazy placement="bottom-start">
        <PopoverTrigger>
          <Button
            size="xs"
            variant="ghost"
            rightIcon={<ChevronDownIcon boxSize="15px" />}
            p="15px 5px"
          >
            <Icon as={selectedMenu.Icon} boxSize="15px" />
          </Button>
        </PopoverTrigger>
        <PopoverContent width="max-content">
          <PopoverBody width="max-content" p="8px">
            <HStack>
              {menuOptions.map((m) => (
                <IconButton
                  key={m.value}
                  aria-label={m.value}
                  size="xs"
                  variant="ghost"
                  isActive={editor.isActive({ textAlign: m.value })}
                  onClick={() => {
                    setSelectedMenu(
                      menuOptions.find((menu) => menu.value === m.value) ||
                        menuOptions[0]
                    );
                    editor.chain().focus().setTextAlign(m.value).run();
                  }}
                  icon={<Icon as={m.Icon} boxSize="15px" />}
                  _active={{
                    bg: colorScheme.navy[50],
                  }}
                />
              ))}
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <IconButton
        aria-label="bullet-list"
        size="xs"
        variant="ghost"
        icon={<MdFormatListBulleted size="20px" />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isDisabled={!editor.can().chain().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        _active={{ bg: colorScheme.navy[50] }}
      />
      <IconButton
        aria-label="numbered-list"
        size="xs"
        variant="ghost"
        icon={<MdFormatListNumbered size="20px" />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isDisabled={!editor.can().chain().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        _active={{ bg: colorScheme.navy[50] }}
      />
      <IconButton
        aria-label="blockquote"
        size="xs"
        variant="ghost"
        icon={<LuTextQuote size="20px" />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isDisabled={!editor.can().chain().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        _active={{ bg: colorScheme.navy[50] }}
      />
    </HStack>
  );
}
