import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { MdArticle, MdEmail } from "react-icons/md";

import { ExperienceData, SocialMediaData } from "../type";

export const ExperiencesData: ExperienceData[] = [
  {
    id: "exp-1",
    title: "Software Engineer - eFishery Indonesia",
    period: "July 2023 - Present",
    description:
      "Promote to be a Contributor for widely range of Internal Application, including eFishery Landing Page, E-Commerce Android TWA Apps, Promo Management Tools, and Order Management Tools",
    img: "/efishery-logo-512.png",
    stacks: [
      "Javascript",
      "Typescript",
      "Vite",
      "Nextjs",
      "Golang",
      "PostgreSQL",
      "MySQL",
      "Trusted Web Application (TWA)",
      "Docker",
      "CICD",
    ],
    link: {
      url: "https://efishery.com/en",
      isExternal: true,
    },
  },
  {
    id: "exp-2",
    title: "Full Stack Engineer - eFishery Indonesia",
    period: "January 2023 - July 2023",
    description:
      "Contribute to develop and style Interactive Web Application for eFishery, including Customer Relationship Management Internal Tools, Promo Management, and E-Commerce App",
    img: "/efishery-logo-512.png",
    stacks: ["Javascript", "Typescript", "React", "Golang", "PostgreSQL"],
    link: {
      url: "https://efishery.com/en",
      isExternal: true,
    },
  },
];

export const socialMediaData: SocialMediaData[] = [
  {
    name: "Linkedin",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/prasetya-ikrapriyadi/",
    isExternal: true,
  },
  {
    name: "Github",
    icon: FaGithub,
    url: "https://github.com/prasetyaikrap",
    isExternal: true,
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/prasetyaip/",
    isExternal: true,
  },
  {
    name: "Articles",
    icon: MdArticle,
    url: "/articles",
  },
  {
    name: "Email",
    icon: MdEmail,
    url: "mailto:prasetya.ikrapriyadi@gmail.com",
    isExternal: true,
  },
  {
    name: "Whatsapp",
    icon: FaWhatsapp,
    url: "https://wa.me/6285846084778?text=Hi",
    isExternal: true,
  },
];
