import InvariantError from "@/services/commons/exceptions/InvariantError";
import { match, P } from "ts-pattern";

export type QueryPaginationPayload<TQueryData = Record<string, any>> = {
  queries?: TQueryData;
  _sort?: string;
  _page: string;
  _limit: string;
  _cursor: string;
};

export default class QueryPagination<TQueryData = Record<string, any>> {
  public queries: QueryPaginationPayload<TQueryData>["queries"];
  public _sort?: QueryPaginationPayload<TQueryData>["_sort"];
  public _page: number;
  public _limit: number;
  public _cursor: string;

  constructor(payload: QueryPaginationPayload<TQueryData>, keys: string[]) {
    this._verifyPayload(payload);
    const { _page, _limit, _sort, _cursor, queries } = payload;
    this.queries = this._pickQueries(queries, keys);
    this._page = parseInt(_page);
    this._limit = parseInt(_limit);
    this._sort = _sort;
    this._cursor = _cursor;
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
    keys: string[]
  ) {
    if (!queries) return queries;

    return Object.entries(queries).reduce((result, current) => {
      const [key, value] = current;
      if (!keys.includes(key)) return result;

      return {
        ...result,
        [key]: value,
      };
    }, {} as TQueryData);
  }
}
