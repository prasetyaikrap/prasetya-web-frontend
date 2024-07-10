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

export interface ExperienceCardProps {
  data: ExperienceData;
}

export interface ExperienceData {
  id: string;
  title: string;
  period: string;
  description: string;
  stacks: string[];
  img: string;
  link?: {
    url: string;
    isExternal?: boolean;
  };
}
