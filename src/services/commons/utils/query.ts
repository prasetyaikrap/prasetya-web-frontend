import {
  CollectionReference,
  OrderByDirection,
  Query,
  Timestamp,
  WhereFilterOp,
} from "firebase-admin/firestore";
import { NextRequest } from "next/server";
import { match } from "ts-pattern";

import {
  FilterOperators,
  FirestoreFilterValue,
  QueryFilter,
} from "../types/query";

export type GenerateFirestoreQueriesProps = {
  queryRef: CollectionReference;
  filters?: QueryFilter[];
  orders?: string[];
  limit?: number;
  cursor: string;
};

export function generateFirestoreQueries({
  queryRef,
  filters = [],
  orders = [],
  limit = 10,
  cursor,
}: GenerateFirestoreQueriesProps) {
  const queryFilters = filters.reduce((result: Query, current) => {
    const { field, operator, value } = firestoreFilterParams(current);
    return result.where(field, operator as WhereFilterOp, value);
  }, queryRef);

  const queryOrders = orders.reduce((result, current) => {
    const { field, order } = firestoreOrderParams(current);
    return result.orderBy(field, order as OrderByDirection);
  }, queryFilters);

  const fullQuery = queryOrders.startAfter(cursor).limit(limit);
  return fullQuery;
}

function firestoreFilterParams(filter: QueryFilter) {
  const { field, value } = filter;
  const [fieldKey, operator] = field.split("__") as [string, FilterOperators];

  const filterParam: {
    operator: string;
    value: FirestoreFilterValue;
  } = match(operator)
    .with("equal", () => ({
      operator: "==",
      value,
    }))
    .with("dateEqual", () => ({
      operator: "!=",
      value: Timestamp.fromDate(new Date(value as string)),
    }))
    .with("notEqual", () => ({
      operator: "!=",
      value,
    }))
    .with("dateNotEqual", () => ({
      operator: "!=",
      value: Timestamp.fromDate(new Date(value as string)),
    }))
    .with("lessThan", () => ({
      operator: "<",
      value,
    }))
    .with("lessThanEqual", () => ({
      operator: "<=",
      value,
    }))
    .with("dateLessThan", () => ({
      operator: "<",
      value: Timestamp.fromDate(new Date(value as string)),
    }))
    .with("dateLessThanEqual", () => ({
      operator: "<=",
      value: Timestamp.fromDate(new Date(value as string)),
    }))
    .with("greaterThan", () => ({
      operator: "<",
      value,
    }))
    .with("greaterThanEqual", () => ({
      operator: "<=",
      value,
    }))
    .with("dateGreaterThan", () => ({
      operator: "<",
      value: Timestamp.fromDate(new Date(value as string)),
    }))
    .with("dateGreaterThanEqual", () => ({
      operator: "<=",
      value: Timestamp.fromDate(new Date(value as string)),
    }))
    .with("contains", () => ({
      operator: "in",
      value,
    }))
    .with("notContains", () => ({
      operator: "not-in",
      value,
    }))
    .with("arrayContains", () => ({
      operator: "array-contains",
      value,
    }))
    .with("arrayContainsAny", () => ({
      operator: "array-contains-any",
      value,
    }))
    .otherwise(() => ({
      operator: "==",
      value,
    }));

  return {
    field: fieldKey,
    operator: filterParam.operator,
    value: filterParam.value,
  };
}

function firestoreOrderParams(fieldOrder: string) {
  if (fieldOrder.startsWith("-")) {
    return {
      field: fieldOrder.slice(1),
      order: "desc",
    };
  }

  return {
    field: fieldOrder,
    order: "asc",
  };
}

function normalizeFilterValue(value: string) {
  const isBoolean = ["true", "false"].includes(value);
  const isNull = value === "null";
  const isNumber = isNaN(parseInt(value));

  if (isBoolean) return value === "true";
  if (isNull) return null;
  if (isNumber) return parseInt(value);
  return value;
}

export function generateFilters(queries?: {
  [key: string]: string;
}): QueryFilter[] {
  if (!queries) return [];
  return Object.keys(queries).map((field) => ({
    field,
    value: queries[field],
  }));
}

export type GetPaginationSearchParamsProps = {
  request: NextRequest;
};

export function getPaginationSearchParams<
  T extends Record<string, any> = Record<string, any>,
>({ request }: GetPaginationSearchParamsProps) {
  const { searchParams } = request.nextUrl;
  const _page = searchParams.get("_page") || "";
  const _limit = searchParams.get("_limit") || "";
  const _sort = searchParams.get("_sort") || "";
  const _cursor = searchParams.get("_cursor") || "";
  const queries = searchParams.get("queries") || "";

  return {
    queries: queries ? (JSON.parse(queries) as T) : undefined,
    _page,
    _limit,
    _sort,
    _cursor,
  };
}

export type GetPaginationMetadataProps = {
  queryRef: CollectionReference;
  totalRowsKey: string;
  limit: number;
  page: number;
  currentCursor: string;
  nextCursor: string;
};

export async function getPaginationMetadata({
  queryRef,
  totalRowsKey,
  limit,
  page,
  currentCursor,
  nextCursor,
}: GetPaginationMetadataProps) {
  const totalRowsMetadata = await queryRef.doc("total_rows").get();

  const totalRows = totalRowsMetadata.data()?.[totalRowsKey] || 0;
  const totalPages = Math.ceil(totalRows / limit);

  return {
    totalRows,
    totalPages,
    currentPage: page,
    previousCursor: currentCursor,
    nextCursor,
  };
}
