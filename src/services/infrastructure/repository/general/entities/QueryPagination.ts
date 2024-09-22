import InvariantError from "@/services/commons/exceptions/InvariantError";

export type QueryPaginationPayload<TQueryData = { [key: string]: string }> = {
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

  constructor(payload: QueryPaginationPayload<TQueryData>) {
    this._verifyPayload(payload);
    const { _page, _limit, _sort, queries } = payload;
    this.queries = queries;
    this._page = parseInt(_page);
    this._limit = parseInt(_limit);
    this._sort = _sort;
  }

  _verifyPayload(payload: QueryPaginationPayload<TQueryData>) {
    const { _page, _limit } = payload;
    // Check required fields
    const requiredCheckFields = [_page, _limit];
    if (requiredCheckFields.filter((f) => !f).length > 0) {
      throw new InvariantError("Query _page and _limit is required");
    }
    // Check fields data type
    if (isNaN(parseInt(_page)) || isNaN(parseInt(_limit))) {
      throw new InvariantError("Invalid query _page and _limit data type");
    }
  }
}
