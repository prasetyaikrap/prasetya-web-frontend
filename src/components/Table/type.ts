import type { TableProps as ChakraTableProps } from "@chakra-ui/react";
import type { BaseRecord } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import type { Column, Table } from "@tanstack/react-table";

export type TablesProps<T extends BaseRecord = BaseRecord> = {
  name?: string;
} & UseTableReturnType<T>;

export type TableProps<T extends BaseRecord = BaseRecord> = {
  refineCore?: UseTableReturnType<T>["refineCore"];
  chakra?: {
    tableProps?: ChakraTableProps;
  };
} & Table<T>;

export type ColumnButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, any>;
};

export type PaginationProps = {
  current: number;
  pageCount: number;
  setCurrent: (page: number) => void;
};

export type CursorPaginationProps = {
  setCursorPage: ((cursor: string) => void) | null;
  prevCursor: string | null;
  nextCursor: string | null;
};
