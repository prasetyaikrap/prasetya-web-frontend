import { IconButtonProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface SocialMediaStackProps {
  data: SocialMediaData[];
}

export interface SocialMediaData {
  name: string;
  icon: IconType;
  url?: string;
  isExternal?: boolean;
  chakra?: Omit<IconButtonProps, "aria-label">;
  onClick?: () => void;
}
