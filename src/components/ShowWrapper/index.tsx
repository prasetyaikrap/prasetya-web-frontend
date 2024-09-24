import { Show } from "@refinedev/chakra-ui";

import { ShowWrapperProps } from "./type";

export default function ShowWrapper({
  children,
  ...refineListProps
}: ShowWrapperProps) {
  return (
    <Show
      wrapperProps={{ width: "full", boxShadow: "base" }}
      {...refineListProps}
    >
      {children}
    </Show>
  );
}
