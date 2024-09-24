"use client";

import { Authenticated } from "@refinedev/core";

import ThemedLayout from "./ThemedLayout";
import { AdminLayoutProps } from "./type";

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Authenticated key="admin-panel" redirectOnFail="/admin/login">
      <ThemedLayout>{children}</ThemedLayout>
    </Authenticated>
  );
}
