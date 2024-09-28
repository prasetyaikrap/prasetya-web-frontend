import { Show } from "@refinedev/chakra-ui";

import { ShowWrapperProps } from "./type";

export default function ShowWrapper({
  children,
  ...refineShowProps
}: ShowWrapperProps) {
  return (
    <Show
      {...refineShowProps}
      wrapperProps={{
        width: "full",
        boxShadow: "base",
        ...refineShowProps?.wrapperProps,
      }}
      contentProps={{ paddingY: "20px", ...refineShowProps?.contentProps }}
    >
      {children}
    </Show>
  );
}
