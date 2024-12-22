import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton } from "@chakra-ui/react";

import type { CursorPaginationProps } from "./type";

export default function CursorPagination({
  prevCursor,
  nextCursor,
  setCursorPage,
}: CursorPaginationProps) {
  return (
    <Box
      data-testid="component_table-cursor-pagination"
      display="flex"
      justifyContent="flex-end"
      alignSelf="flex-end"
    >
      <HStack my="3" spacing="1">
        <IconButton
          aria-label="previous page"
          onClick={() => setCursorPage?.(prevCursor || "")}
          isDisabled={!prevCursor}
          variant="outline"
          icon={<ChevronLeftIcon />}
          size="sm"
          data-testid="btn_prev-cursor-pagination"
        />

        <IconButton
          aria-label="next page"
          onClick={() => setCursorPage?.(nextCursor || "")}
          isDisabled={!nextCursor}
          variant="outline"
          icon={<ChevronRightIcon />}
          size="sm"
          data-testid="btn_next-cursor-pagination"
        />
      </HStack>
    </Box>
  );
}
