export enum FooterTemplate {
  Default = "DEFAULT",
  Primary = "PRIMARY",
  None = "NONE",
}

export interface FooterProps {
  footer?: FooterTemplate;
}
