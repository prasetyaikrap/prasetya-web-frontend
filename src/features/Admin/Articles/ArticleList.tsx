"use client";

import { CanAccess } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { List, NotAuthorized, RefineTable } from "@/components";

import { ArticlesList } from "./type";

export default function ArticleList() {
  const columns: ColumnDef<ArticlesList>[] = useMemo(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "category",
        accessorKey: "category",
        header: "Category",
      },
      {
        id: "modified_by",
        accessorKey: "modified_by",
        header: "Published By",
      },
      {
        id: "modified_at",
        accessorKey: "modified_at",
        header: "Publish Date",
      },
      {
        id: "created_at",
        accessorKey: "created_at",
        header: "Created Date",
      },
    ],
    []
  );

  const tableProps = useTable<ArticlesList>({
    refineCoreProps: {
      resource: "articleList",
      queryOptions: {
        enabled: false,
      },
    },
    columns,
  });

  return (
    <CanAccess fallback={<NotAuthorized />}>
      <List canCreate>
        <RefineTable {...tableProps} />
      </List>
    </CanAccess>
  );
}
