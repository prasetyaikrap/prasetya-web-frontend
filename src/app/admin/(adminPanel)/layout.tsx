"use client";
import { ReactNode, useEffect } from "react";

import { AdminLayout as CustomAdminLayout } from "@/containers";
import { ResourceType } from "@/contexts/AppContext/type";
import { useApp } from "@/hooks";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { setResourceType } = useApp();

  useEffect(() => {
    setResourceType(ResourceType.Admin);
  }, [setResourceType]);

  return <CustomAdminLayout>{children}</CustomAdminLayout>;
}
