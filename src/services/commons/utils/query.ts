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
  offset?: number;
  limit?: number;
};

export function generateFirestoreQueries({
  queryRef,
  filters = [],
  orders = [],
  offset = 0,
  limit = 10,
}: GenerateFirestoreQueriesProps) {
  const queryFilters = filters.reduce((result: Query, current) => {
    const { field, operator, value } = firestoreFilterParams(current);
    return result.where(field, operator as WhereFilterOp, value);
  }, queryRef);

  const queryOrders = orders.reduce((result, current) => {
    const { field, order } = firestoreOrderParams(current);
    return result.orderBy(field, order as OrderByDirection);
  }, queryFilters);

  const fullQuery = queryOrders.offset(offset).limit(limit);
  return fullQuery;
}

function firestoreFilterParams(filter: QueryFilter) {
  const { field, value } = filter;
  const [operator, fieldKey] = field.split("__") as [FilterOperators, string];
  const filterParam: {
    operator: string;
    value: FirestoreFilterValue;
  } = match(operator)
    .with("equal", () => ({
      operator: "==",
      value: normalizeFilterValue(value),
    }))
    .with("dateEqual", () => ({
      operator: "!=",
      value: Timestamp.fromDate(new Date(value)),
    }))
    .with("notEqual", () => ({
      operator: "!=",
      value: normalizeFilterValue(value),
    }))
    .with("dateNotEqual", () => ({
      operator: "!=",
      value: Timestamp.fromDate(new Date(value)),
    }))
    .with("lessThan", () => ({
      operator: "<",
      value: parseInt(value),
    }))
    .with("lessThanEqual", () => ({
      operator: "<=",
      value: parseInt(value),
    }))
    .with("dateLessThan", () => ({
      operator: "<",
      value: Timestamp.fromDate(new Date(value)),
    }))
    .with("dateLessThanEqual", () => ({
      operator: "<=",
      value: Timestamp.fromDate(new Date(value)),
    }))
    .with("greaterThan", () => ({
      operator: "<",
      value: parseInt(value),
    }))
    .with("greaterThanEqual", () => ({
      operator: "<=",
      value: parseInt(value),
    }))
    .with("dateGreaterThan", () => ({
      operator: "<",
      value: Timestamp.fromDate(new Date(value)),
    }))
    .with("dateGreaterThanEqual", () => ({
      operator: "<=",
      value: Timestamp.fromDate(new Date(value)),
    }))
    .with("contains", () => ({
      operator: "in",
      value: value.split(",").map((s) => normalizeFilterValue(s)),
    }))
    .with("notContains", () => ({
      operator: "not-in",
      value: value.split(",").map((s) => normalizeFilterValue(s)),
    }))
    .with("arrayContains", () => ({
      operator: "array-contains",
      value: normalizeFilterValue(value),
    }))
    .with("arrayContainsAny", () => ({
      operator: "array-contains-any",
      value: value.split(",").map((s) => normalizeFilterValue(s)),
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

export function getPaginationSearchParams({
  request,
}: GetPaginationSearchParamsProps) {
  const { searchParams } = request.nextUrl;
  const _page = searchParams.get("_page") || "";
  const _limit = searchParams.get("_limit") || "";
  const _sort = searchParams.get("_sort") || "";
  const queries = searchParams.get("queries") || "";

  return {
    queries: queries ? JSON.parse(queries) : undefined,
    _page,
    _limit,
    _sort,
  };
}

export type GetPaginationMetadataProps = {
  queryRef: CollectionReference;
  totalRowsKey: string;
  limit: number;
  offset: number;
};

export async function getPaginationMetadata({
  queryRef,
  totalRowsKey,
  limit,
  offset,
}: GetPaginationMetadataProps) {
  const totalRowsMetadata = await queryRef.doc("total_rows").get();

  const totalRows = totalRowsMetadata.data()?.[totalRowsKey] || 0;
  const totalPages = Math.ceil(totalRows / limit);
  const currentPage = offset / limit + 1;

  return {
    totalRows,
    totalPages,
    currentPage,
  };
}
