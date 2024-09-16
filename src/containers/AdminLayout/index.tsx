"use client";

import ThemedLayout from "./ThemedLayout";
import { AdminLayoutProps } from "./type";

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <ThemedLayout>{children}</ThemedLayout>;
}
