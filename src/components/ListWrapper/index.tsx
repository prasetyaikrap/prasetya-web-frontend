import { List } from "@refinedev/chakra-ui";

import { ListWrapperProps } from "./type";

export default function ListWrapper({
  children,
  ...refineListProps
}: ListWrapperProps) {
  return (
    <List
      {...refineListProps}
      wrapperProps={{
        width: "full",
        boxShadow: "base",
        ...refineListProps?.wrapperProps,
      }}
      contentProps={{ paddingY: "20px", ...refineListProps?.contentProps }}
    >
      {children}
    </List>
  );
}
