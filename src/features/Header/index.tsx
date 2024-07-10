import { useAppContext } from "@/hooks";

import PrimaryHeader from "./Primary";
import { HeaderTemplate } from "./type";

export default function Header() {
  const { header } = useAppContext();

  switch (header) {
    case HeaderTemplate.Primary:
      return <PrimaryHeader />;
    default:
      return null;
  }
}
