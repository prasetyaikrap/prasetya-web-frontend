import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { match, P } from "ts-pattern";

import { BaseEditorProps, MenuOption } from "./MenuBar";

type TypographyMenusProps = BaseEditorProps;
export function TypographyMenus({ editor }: TypographyMenusProps) {
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
  const [selectedMenu, setSelectedMenu] = useState(menuOptions[0]);

  const handleItemChange = (value: string | string[]) => {
    const selectedMenu = menuOptions.find((t) => t.value === (value as string));
    setSelectedMenu(selectedMenu || menuOptions[0]);
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
    if (activeIndex < 0) return setSelectedMenu(menuOptions[0]);
    return setSelectedMenu(menuOptions[activeIndex]);

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
        {selectedMenu.label}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type="radio"
          value={selectedMenu.value}
          onChange={handleItemChange}
        >
          {menuOptions.map((t) => (
            <MenuItemOption key={t.value} fontSize="sm" value={t.value}>
              {t.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
