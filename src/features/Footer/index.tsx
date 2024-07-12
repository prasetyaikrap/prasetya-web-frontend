import PrimaryFooter from "./Primary";
import { FooterProps, FooterTemplate } from "./type";

export default function Footer({ footer }: FooterProps) {
  switch (footer) {
    case FooterTemplate.Primary:
      return <PrimaryFooter />;
    default:
      return null;
  }
}
