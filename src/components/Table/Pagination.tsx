import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, IconButton } from '@chakra-ui/react';
import { usePagination } from '@refinedev/chakra-ui';

import type { PaginationProps } from './type';

export default function Pagination({ current, pageCount, setCurrent }: PaginationProps) {
  const pagination = usePagination({
    current,
    pageCount,
  });

  return (
    <Box
      data-testid="component_table-pagination"
      display="flex"
      justifyContent="flex-end"
      alignSelf="flex-end"
    >
      <HStack my="3" spacing="1">
        {pagination?.prev && (
          <IconButton
            aria-label="previous page"
            onClick={() => setCurrent(current - 1)}
            disabled={!pagination?.prev}
            variant="outline"
            icon={<ChevronLeftIcon />}
            size="sm"
            data-testid="btn_prev-pagination"
          />
        )}

        {pagination?.items.map((page) => {
          if (typeof page === 'string') return <span key={page}>...</span>;

          return (
            <Button
              key={page}
              onClick={() => setCurrent(page)}
              variant={page === current ? 'solid' : 'outline'}
              size="sm"
              data-testid={`btn_number-pagination-${page}`}
            >
              {page}
            </Button>
          );
        })}
        {pagination?.next && (
          <IconButton
            aria-label="next page"
            onClick={() => setCurrent(current + 1)}
            variant="outline"
            icon={<ChevronRightIcon />}
            size="sm"
            data-testid="btn_next-pagination"
          />
        )}
      </HStack>
    </Box>
  );
}
