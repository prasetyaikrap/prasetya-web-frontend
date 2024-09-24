import { Edit } from "@refinedev/chakra-ui";

import { EditWrapperProps } from "./type";

export default function EditWrapper({
  children,
  ...refineListProps
}: EditWrapperProps) {
  return (
    <Edit
      wrapperProps={{ width: "full", boxShadow: "base" }}
      {...refineListProps}
    >
      {children}
    </Edit>
  );
}
