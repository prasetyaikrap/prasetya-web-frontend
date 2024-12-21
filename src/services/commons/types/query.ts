import { Timestamp } from "firebase-admin/firestore";

export type FilterOperators =
  | "lessThan"
  | "dateLessThan"
  | "lessThanEqual"
  | "dateLessThanEqual"
  | "greaterThan"
  | "dateGreaterThan"
  | "greaterThanEqual"
  | "dateGreaterThanEqual"
  | "equal"
  | "dateEqual"
  | "notEqual"
  | "dateNotEqual"
  | "contains"
  | "notContains"
  | "arrayContains"
  | "arrayContainsAny";

export type FirestoreFilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | Timestamp
  | (string | number | boolean | Record<string, any> | null)[]
  | Record<string, any>
  | null;

export type QueryFilter = {
  field: string;
  value: string | string[] | number | number[] | boolean | Record<string, any>;
};

export type QueryOrder = string[];
