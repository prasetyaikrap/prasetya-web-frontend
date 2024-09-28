import { Create } from "@refinedev/chakra-ui";

import { CreateWrapperProps } from "./type";

export default function CreateWrapper({
  children,
  ...refineCreateProps
}: CreateWrapperProps) {
  return (
    <Create
      {...refineCreateProps}
      wrapperProps={{
        width: "full",
        boxShadow: "base",
        ...refineCreateProps?.wrapperProps,
      }}
      contentProps={{ paddingY: "20px", ...refineCreateProps?.contentProps }}
    >
      {children}
    </Create>
  );
}
