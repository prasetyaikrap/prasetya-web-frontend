import { List } from "@refinedev/chakra-ui";
import { ListWrapperProps } from "./type";

export default function ListWrapper({
  children,
  ...refineListProps
}: ListWrapperProps) {
  return (
    <List
      wrapperProps={{ width: "full", boxShadow: "base" }}
      {...refineListProps}
    >
      {children}
    </List>
  );
}