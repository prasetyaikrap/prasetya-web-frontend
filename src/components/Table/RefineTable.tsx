import {
  HStack,
  Spinner,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import type { BaseRecord } from "@refinedev/core";
import { flexRender } from "@tanstack/react-table";
import { CreatableSelect, SingleValue } from "chakra-react-select";
import { useCallback, useMemo } from "react";

import ColumnSorter from "./ColumnSorter";
import CursorPagination from "./CursorPagination";
import Pagination from "./Pagination";
import type { RefineMetaQuery, TablePaginationProps, TableProps } from "./type";

export default function RefineTable<T extends BaseRecord = BaseRecord>({
  getHeaderGroups,
  getRowModel,
  getAllColumns,
  refineCore,
  getState,
  getCoreRowModel,
  setPageIndex,
  setPageSize,
  chakra,
  pagination,
}: TableProps<T>) {
  const headerGroups = getHeaderGroups();
  const columns = getAllColumns();
  const rowData = getRowModel().rows;
  const paginationConfig = {
    keepShowPanel: false,
    showSizeChanger: false,
    sizes: [10, 25, 50, 100],
    maxPageSize: 100,
    mode: "default",
    ...pagination,
  };

  const tableState = getState();
  const refineMetadata = refineCore?.tableQuery?.data
    ?.metadata as RefineMetaQuery;

  const manualCurrentPage = tableState.pagination.pageIndex + 1;
  const manualPageCount = Math.ceil(
    getCoreRowModel().rows.length / tableState.pagination.pageSize
  );
  const manualSetCurrent = useCallback(
    (page: number) => {
      setPageIndex(page - 1);
    },
    [setPageIndex]
  );

  const manualPageSize = tableState.pagination.pageSize;

  const tableConfig = useMemo(() => {
    if (refineCore) {
      const isFetching = refineCore.tableQuery?.fetchStatus === "fetching";
      const setCursorPage = (cursor: string) => {
        refineCore.setFilters([
          {
            field: "_cursor",
            operator: "eq",
            value: cursor || undefined,
          },
        ]);
      };
      return {
        isFetching,
        isDataEmpty: !isFetching && rowData.length <= 0,
        isDataExist: !isFetching && rowData.length > 0,
        current: refineCore.current,
        pageCount: refineCore.pageCount,
        setCurrent: refineCore.setCurrent,
        pageSize: refineCore.pageSize,
        setPageSize: refineCore.setPageSize,
        setCursorPage,
      };
    }

    return {
      isFetching: false,
      isDataEmpty: rowData.length <= 0,
      isDataExist: rowData.length > 0,
      current: manualCurrentPage,
      pageCount: manualPageCount,
      setCurrent: manualSetCurrent,
      pageSize: manualPageSize,
      setPageSize,
      setCursorPage: null,
    };
  }, [
    refineCore,
    rowData.length,
    manualCurrentPage,
    manualPageCount,
    manualSetCurrent,
    manualPageSize,
    setPageSize,
  ]);

  const showPaginationPanel =
    paginationConfig.keepShowPanel || tableConfig.pageCount > 1;

  return (
    <VStack width="full" data-testid="component-table">
      <TableContainer width="full">
        <ChakraTable variant="simple" {...chakra?.tableProps}>
          <Thead border="1px" borderColor="gray.100" roundedTop="md">
            {headerGroups.map((headerGroup) => (
              <Tr key={headerGroup.id} bgColor="gray.50">
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {!header.isPlaceholder && (
                      <HStack spacing="10px" justifyContent="center">
                        <Text>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Text>
                        <HStack spacing="2">
                          {header.column.getCanSort() && (
                            <ColumnSorter column={header.column} />
                          )}
                        </HStack>
                      </HStack>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {tableConfig.isFetching && (
              <Tr>
                <Td colSpan={columns.length} textAlign="center">
                  <Spinner size="lg" color="brand.500" />
                </Td>
              </Tr>
            )}
            {tableConfig.isDataEmpty && (
              <Tr>
                <Td colSpan={columns.length} textAlign="center">
                  No Data
                </Td>
              </Tr>
            )}
            {tableConfig.isDataExist &&
              rowData.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </ChakraTable>
      </TableContainer>
      {showPaginationPanel && (
        <PaginationBox
          tableConfig={tableConfig as PaginationBoxProps["tableConfig"]}
          paginationConfig={
            paginationConfig as PaginationBoxProps["paginationConfig"]
          }
          metadata={refineMetadata}
        />
      )}
    </VStack>
  );
}

type PaginationBoxProps = {
  paginationConfig: Required<TablePaginationProps>;
  tableConfig: {
    isFetching: boolean;
    isDataEmpty: boolean;
    isDataExist: boolean;
    current: number;
    pageCount: number;
    setCurrent:
      | NonNullable<TableProps["refineCore"]>["setCurrent"]
      | ((page: number) => void);
    pageSize: number;
    setPageSize:
      | NonNullable<TableProps["refineCore"]>["setPageSize"]
      | TableProps["setPageSize"];
    setCursorPage: (cursor: string) => void;
  };
  metadata: RefineMetaQuery;
};

function PaginationBox({
  paginationConfig: { showSizeChanger, sizes, maxPageSize, mode },
  tableConfig,
  metadata,
}: PaginationBoxProps) {
  const sizeChangerOptions = sizes
    ?.filter((sc) => sc <= maxPageSize)
    ?.map((sc) => ({ label: sc, value: sc }));

  const onSizeChangerChange = (
    option: SingleValue<{
      label: number;
      value: number;
    }>
  ) => {
    if (!option?.value) return;
    const value = option.value > maxPageSize ? maxPageSize : option.value;
    tableConfig.setPageSize(value);
  };

  return (
    <HStack width="full" justifyContent="right">
      {showSizeChanger && (
        <CreatableSelect
          colorScheme="brand"
          size="sm"
          options={sizeChangerOptions}
          value={{
            label: tableConfig.pageSize,
            value: tableConfig.pageSize,
          }}
          onChange={onSizeChangerChange}
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              bg: "transparent",
              px: 2,
              cursor: "inherit",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none",
            }),
          }}
        />
      )}
      {mode === "cursor" && (
        <CursorPagination
          setCursorPage={tableConfig.setCursorPage}
          prevCursor={metadata.previous_cursor}
          nextCursor={metadata.next_cursor}
        />
      )}
      {mode === "default" && (
        <Pagination
          current={tableConfig.current}
          pageCount={tableConfig.pageCount}
          setCurrent={tableConfig.setCurrent}
        />
      )}
    </HStack>
  );
}
