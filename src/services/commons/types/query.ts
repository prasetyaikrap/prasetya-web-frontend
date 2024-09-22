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
  | (string | number | boolean | null)[]
  | null;

export type QueryFilter = {
  field: string;
  value: string;
};

export type QueryOrder = string[];
