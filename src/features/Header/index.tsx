"use client";
import PrimaryHeader from "./Primary";
import { HeaderProps, HeaderTemplate } from "./type";

export default function Header({ header }: HeaderProps) {
  switch (header) {
    case HeaderTemplate.Primary:
      return <PrimaryHeader />;
    default:
      return null;
  }
}
