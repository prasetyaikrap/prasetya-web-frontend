"use client";
import { ThemedLayoutV2 } from "@refinedev/chakra-ui";
import { ReactNode, useEffect } from "react";

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

  return <ThemedLayoutV2>{children}</ThemedLayoutV2>;
}
