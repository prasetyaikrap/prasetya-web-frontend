import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdFormatBold, MdFormatItalic } from "react-icons/md";
import { match } from "ts-pattern";

import { colorScheme } from "@/configs";

import { BaseEditorProps, MenuOption } from "./MenuBar";

type TextFormatsProps = BaseEditorProps;
export function TextFormats({ editor }: TextFormatsProps) {
  const menuOptions: MenuOption[] = [
    {
      label: "Underline",
      value: "underline",
    },
    {
      label: "Strikethrough",
      value: "strikethrough",
    },
    {
      label: "Code",
      value: "code",
    },
    {
      label: "Subscript",
      value: "subscript",
    },
    {
      label: "Superscript",
      value: "superscript",
    },
    {
      label: "Clear Formating",
      value: "clearformating",
    },
  ];

  const [menuLabel, setMenuLabel] = useState<MenuOption[] | null>(null);

  const handleItemChange = (values: string | string[]) => {
    const selectedMenu = menuOptions.filter((t) => {
      if ((values as string[]).includes("clearformating"))
        return t.value === "clearformating";
      if ((values as string[]).includes("code")) return t.value === "code";
      return values.includes(t.value);
    });

    if (selectedMenu.map((m) => m.value).includes("clearformating")) {
      setMenuLabel([]);
      return editor.chain().focus().unsetAllMarks().run();
    }

    setMenuLabel(selectedMenu || null);
    editor.chain().focus().unsetAllMarks().run();

    selectedMenu.forEach((menu) => {
      match([menu.value])
        .with(["underline"], () => {
          return editor.chain().focus().toggleUnderline().run();
        })
        .with(["strikethrough"], () => {
          return editor.chain().focus().toggleStrike().run();
        })
        .with(["code"], () => {
          return editor.chain().focus().toggleCode().run();
        })
        .with(["subscript"], () => {
          return editor.chain().focus().toggleSubscript().run();
        })
        .with(["superscript"], () => {
          return editor.chain().focus().toggleSuperscript().run();
        })
        .otherwise(() => {});
    });
  };

  const handleOptionDisabled = (value: string) => {
    return match([value])
      .with(["underline"], () => {
        return editor.can().chain().focus().toggleUnderline().run();
      })
      .with(["strikethrough"], () => {
        return editor.can().chain().focus().toggleStrike().run();
      })
      .with(["code"], () => {
        return editor.can().chain().focus().toggleCode().run();
      })
      .with(["subscript"], () => {
        return editor.can().chain().focus().toggleSubscript().run();
      })
      .with(["superscript"], () => {
        return editor.can().chain().focus().toggleSuperscript().run();
      })
      .with(["clearformating"], () => {
        return editor.can().chain().focus().unsetAllMarks().run();
      })
      .otherwise(() => false);
  };

  const watchTextFormatting = [
    editor.isActive("underline"),
    editor.isActive("strike"),
    editor.isActive("code"),
    editor.isActive("subscript"),
    editor.isActive("superscript"),
  ];

  const [
    watchUnderline,
    watchStrike,
    watchCode,
    watchSubscript,
    watchSuperscript,
  ] = watchTextFormatting;

  useEffect(() => {
    const reducedMenuLabel = watchTextFormatting.reduce(
      (result: MenuOption[], current, currIndex) => {
        if (current) {
          result.push(menuOptions[currIndex]);
        }
        return result;
      },
      []
    );

    return setMenuLabel(reducedMenuLabel);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchUnderline,
    watchStrike,
    watchCode,
    watchSubscript,
    watchSuperscript,
  ]);

  return (
    <HStack>
      <IconButton
        size="xs"
        aria-label="bold"
        variant="ghost"
        icon={<MdFormatBold size="20px" />}
        isDisabled={!editor.can().chain().toggleBold().run()}
        onClick={() => editor.chain().toggleBold().run()}
        isActive={editor.isActive("bold")}
        _active={{
          bg: colorScheme.navy[50],
        }}
      />
      <IconButton
        size="xs"
        aria-label="italic"
        variant="ghost"
        icon={<MdFormatItalic size="20px" />}
        isDisabled={!editor.can().chain().toggleItalic().run()}
        onClick={() => editor.chain().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        _active={{
          bg: colorScheme.navy[50],
        }}
      />
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          size="xs"
          variant="ghost"
          icon={<BsThreeDots size="20px" />}
        />
        <MenuList width="100px">
          <MenuOptionGroup
            type="checkbox"
            value={menuLabel?.map((t) => t.value)}
            onChange={handleItemChange}
          >
            {menuOptions.map((t) => (
              <MenuItemOption
                fontSize="sm"
                key={t.value}
                value={t.value}
                isDisabled={!handleOptionDisabled(t.value)}
              >
                {t.label}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </HStack>
  );
}
