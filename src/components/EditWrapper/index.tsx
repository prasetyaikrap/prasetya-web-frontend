import { Edit } from "@refinedev/chakra-ui";

import { EditWrapperProps } from "./type";

export default function EditWrapper({
  children,
  ...refineEditProps
}: EditWrapperProps) {
  return (
    <Edit
      {...refineEditProps}
      wrapperProps={{
        width: "full",
        boxShadow: "base",
        ...refineEditProps?.wrapperProps,
      }}
      contentProps={{ paddingY: "20px", ...refineEditProps?.contentProps }}
    >
      {children}
    </Edit>
  );
}
