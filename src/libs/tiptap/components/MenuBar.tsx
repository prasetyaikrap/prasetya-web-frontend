import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdFormatBold, MdFormatItalic, MdRedo, MdUndo } from "react-icons/md";
import { match, P } from "ts-pattern";

import { colorScheme } from "@/configs";

export type MenuBarProps = {
  editor: Editor | null;
};

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  return (
    <HStack
      width="full"
      maxWidth="1100px"
      height="60px"
      boxShadow="base"
      padding="10px 20px"
    >
      <UndoRedo editor={editor} />
      <Divider orientation="vertical" />
      <TypographyMenus editor={editor} />
      <Divider orientation="vertical" />
      <TextFormats editor={editor} />
      <Divider orientation="vertical" />
    </HStack>
  );
}

type BaseEditorProps = {
  editor: Editor;
};
type MenuOption = {
  label: string;
  value: string;
};

type UndoRedoProps = BaseEditorProps;
function UndoRedo({ editor }: UndoRedoProps) {
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

type TypographyMenusProps = BaseEditorProps;
function TypographyMenus({ editor }: TypographyMenusProps) {
  const menuOptions: MenuOption[] = [
    {
      label: "Normal Text",
      value: "paragraph_0",
    },
    {
      label: "Heading 1",
      value: "heading_1",
    },
    {
      label: "Heading 2",
      value: "heading_2",
    },
    {
      label: "Heading 3",
      value: "heading_3",
    },
    {
      label: "Heading 4",
      value: "heading_4",
    },
    {
      label: "Heading 5",
      value: "heading_5",
    },
    {
      label: "Heading 6",
      value: "heading_6",
    },
  ];
  const [menuLabel, setMenuLabel] = useState(menuOptions[0]);

  const handleItemChange = (value: string | string[]) => {
    const selectedMenu = menuOptions.find((t) => t.value === (value as string));
    setMenuLabel(selectedMenu || menuOptions[0]);
    const [type, level] = (value as string).split("_");
    match([type, level])
      .with(["paragraph", P.string], () => {
        editor.chain().focus().setParagraph().run();
      })
      .with(["heading", P.string], () => {
        editor
          .chain()
          .focus()
          .toggleHeading({ level: Number(level) as never })
          .run();
      })
      .otherwise(() => editor.chain().focus().setParagraph().run());
  };

  const watchTypography = [
    editor.isActive("paragraph"),
    editor.isActive("heading", { level: 1 }),
    editor.isActive("heading", { level: 2 }),
    editor.isActive("heading", { level: 3 }),
    editor.isActive("heading", { level: 4 }),
    editor.isActive("heading", { level: 5 }),
    editor.isActive("heading", { level: 6 }),
  ];

  const [watchParagraph, watchH1, watchH2, watchH3, watchH4, watchH5, watchH6] =
    watchTypography;

  useEffect(() => {
    const activeIndex = watchTypography.findIndex((t) => t === true);
    if (activeIndex < 0) return setMenuLabel(menuOptions[0]);
    return setMenuLabel(menuOptions[activeIndex]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchParagraph, watchH1, watchH2, watchH3, watchH4, watchH5, watchH6]);

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        colorScheme="brand"
        rightIcon={<ChevronDownIcon />}
      >
        {menuLabel.label}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          value={menuLabel.value}
          onChange={handleItemChange}
        >
          {menuOptions.map((t) => (
            <MenuItemOption key={t.value} value={t.value}>
              {t.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

type TextFormatsProps = BaseEditorProps;
function TextFormats({ editor }: TextFormatsProps) {
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
        size="sm"
        aria-label="bold"
        variant="ghost"
        icon={<MdFormatBold size="25px" />}
        isDisabled={!editor.can().chain().toggleBold().run()}
        onClick={() => editor.chain().toggleBold().run()}
        isActive={editor.isActive("bold")}
        _active={{
          bg: colorScheme.navy[50],
        }}
      />
      <IconButton
        size="sm"
        aria-label="italic"
        variant="ghost"
        icon={<MdFormatItalic size="25px" />}
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
          size="sm"
          variant="ghost"
          icon={<BsThreeDots size="25px" />}
        />
        <MenuList>
          <MenuOptionGroup
            type="checkbox"
            value={menuLabel?.map((t) => t.value)}
            onChange={handleItemChange}
          >
            {menuOptions.map((t) => (
              <MenuItemOption
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
