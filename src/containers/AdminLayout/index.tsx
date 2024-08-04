import { ThemedLayoutV2 } from "@refinedev/chakra-ui";

import Title from "./Title";
import { AdminLayoutProps } from "./type";

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <ThemedLayoutV2 Title={Title}>{children}</ThemedLayoutV2>;
}
