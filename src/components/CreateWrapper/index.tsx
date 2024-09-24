import { Create } from "@refinedev/chakra-ui";

import { CreateWrapperProps } from "./type";

export default function CreateWrapper({
  children,
  ...refineListProps
}: CreateWrapperProps) {
  return (
    <Create
      wrapperProps={{ width: "full", boxShadow: "base" }}
      {...refineListProps}
    >
      {children}
    </Create>
  );
}
