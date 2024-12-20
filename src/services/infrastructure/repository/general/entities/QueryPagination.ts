import InvariantError from "@/services/commons/exceptions/InvariantError";
import { FilterOperators } from "@/services/commons/types/query";
import { match, P } from "ts-pattern";

export type QueryPaginationPayload<TQueryData = Record<string, string>> = {
  queries?: TQueryData;
  _sort?: string;
  _page: string;
  _limit: string;
};

export default class QueryPagination<TQueryData = { [key: string]: string }> {
  public queries: QueryPaginationPayload<TQueryData>["queries"];
  public _sort?: QueryPaginationPayload<TQueryData>["_sort"];
  public _page: number;
  public _limit: number;

  constructor(
    payload: QueryPaginationPayload<TQueryData>,
    keyMap?: Record<string, FilterOperators>
  ) {
    this._verifyPayload(payload);
    const { _page, _limit, _sort, queries } = payload;
    this.queries = this._pickQueries(queries, keyMap);
    this._page = parseInt(_page);
    this._limit = parseInt(_limit);
    this._sort = _sort;
  }

  _verifyPayload(payload: QueryPaginationPayload<TQueryData>) {
    match(payload)
      .with({ _page: P.nullish, _limit: P.nullish }, () => {
        throw new InvariantError("Query _page and _limit is required");
      })
      .with(
        {
          _page: P.when((v) => isNaN(parseInt(v))),
          _limit: P.when((v) => isNaN(parseInt(v))),
        },
        () => {
          throw new InvariantError("Invalid query _page and _limit data type");
        }
      )
      .otherwise(() => {});
  }

  _pickQueries(
    queries: QueryPaginationPayload<TQueryData>["queries"],
    keyMap?: Record<string, FilterOperators>
  ) {
    if (!queries || !keyMap) return queries;

    return Object.entries(queries).reduce((result, current) => {
      const [key, value] = current;
      const queryOperator = keyMap[current[0]];
      if (!queryOperator) return result;

      return {
        ...result,
        [`${key}__${queryOperator}`]: value,
      };
    }, {} as TQueryData);
  }
}
