import { useAppContext } from "@/hooks";
import { HeaderTemplate } from "./type";
import PrimaryHeader from "./Primary";

export default function Header() {
  const { header } = useAppContext();

  switch (header) {
    case HeaderTemplate.Primary:
      return <PrimaryHeader />;
    default:
      return null;
  }
}
