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
import { useCallback, useMemo } from "react";

import ColumnSorter from "./ColumnSorter";
import Pagination from "./Pagination";
import type { TableProps } from "./type";

export default function RefineTable<T extends BaseRecord = BaseRecord>({
  getHeaderGroups,
  getRowModel,
  getAllColumns,
  refineCore,
  getState,
  getCoreRowModel,
  setPageIndex,
  chakra,
}: TableProps<T>) {
  const headerGroups = getHeaderGroups();
  const columns = getAllColumns();
  const rowData = getRowModel().rows;

  const manualCurrentPage = getState().pagination.pageIndex + 1;
  const manualPageCount = Math.ceil(
    getCoreRowModel().rows.length / getState().pagination.pageSize
  );
  const manualSetCurrent = useCallback(
    (page: number) => {
      setPageIndex(page - 1);
    },
    [setPageIndex]
  );

  const tableConfig = useMemo(() => {
    if (refineCore) {
      const isFetching =
        refineCore.tableQueryResult?.fetchStatus === "fetching";
      return {
        isFetching,
        isDataEmpty: !isFetching && rowData.length <= 0,
        isDataExist: !isFetching && rowData.length > 0,
        current: refineCore.current,
        pageCount: refineCore.pageCount,
        setCurrent: refineCore.setCurrent,
      };
    }

    return {
      isFetching: false,
      isDataEmpty: rowData.length <= 0,
      isDataExist: rowData.length > 0,
      current: manualCurrentPage,
      pageCount: manualPageCount,
      setCurrent: manualSetCurrent,
    };
  }, [
    manualCurrentPage,
    manualPageCount,
    manualSetCurrent,
    refineCore,
    rowData.length,
  ]);

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
      {tableConfig.pageCount > 1 && (
        <Pagination
          current={tableConfig.current}
          pageCount={tableConfig.pageCount}
          setCurrent={tableConfig.setCurrent}
        />
      )}
    </VStack>
  );
}
