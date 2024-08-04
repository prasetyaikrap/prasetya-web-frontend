import { IconButton } from "@chakra-ui/react";
import type { SortDirection } from "@tanstack/react-table";
import { TbChevronDown, TbChevronUp, TbSelector } from "react-icons/tb";

import type { ColumnButtonProps } from "./type";

export default function ColumnSorter({ column }: ColumnButtonProps) {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  return (
    <IconButton
      data-testid="btn_sorter-icon"
      aria-label="Sort"
      size="xs"
      onClick={column.getToggleSortingHandler()}
      icon={<ColumnSorterIcon sorted={sorted} />}
      variant={sorted ? "light" : "transparent"}
      color={sorted ? "primary" : "gray"}
    />
  );
}

function ColumnSorterIcon({ sorted }: { sorted: false | SortDirection }) {
  if (sorted === "asc")
    return <TbChevronDown data-testid="btn_icon-sort-asc" size={18} />;
  if (sorted === "desc")
    return <TbChevronUp data-testid="btn_icon-sort-desc" size={18} />;
  return <TbSelector data-testid="btn_icon-sort-selector" size={18} />;
}
