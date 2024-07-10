import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { colorScheme } from "@/configs";

import { SocialMediaStackProps } from "../type";

export default function SocialMediaStack({ data }: SocialMediaStackProps) {
  const router = useRouter();
  const onIconClick = (url?: string, isExternal?: boolean) => {
    if (!url) return;
    if (isExternal) {
      return window.open(url);
    }

    return router.push(url);
  };

  return (
    <HStack spacing="10px">
      {data.map((sm, i) => (
        <Tooltip key={`${sm.name}-${i}`} placement="top" label={sm.name}>
          <IconButton
            id={`btn_${sm.name}`}
            data-testid={`btn_${sm.name}`}
            aria-label={sm.name}
            icon={<sm.icon color={colorScheme.monochrome[2]} />}
            bg="transparent"
            fontSize={{ base: "32px", "2xl": "40px" }}
            onClick={() => {
              sm.onClick?.() ?? onIconClick(sm.url, sm.isExternal);
            }}
            cursor="pointer"
            _hover={{
              opacity: 0.8,
            }}
            {...sm.chakra}
          />
        </Tooltip>
      ))}
    </HStack>
  );
}
