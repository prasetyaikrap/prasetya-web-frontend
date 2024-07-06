import "./globals.css";

import type { Metadata } from "next";
import { ReactNode } from "react";

import { ENV } from "@/configs";
import { RootContainer } from "@/containers";

export const metadata: Metadata = {
  metadataBase: new URL(ENV.APP_HOST),
  title:
    "Prasetya Ikra Priyadi - Build your Digital Apps with exceptional User Experiences",
  description:
    "Hi, my name Prasetya Ikra Priyadi. I am building Digital App with exceptional User Experiences. Let's work together",
  applicationName: "Prasetya Priyadi Personal Web App",
  creator: "Prasetya Ikra Priyadi",
  publisher: "Prasetya Ikra Priyadi",
  authors: [
    {
      name: "Prasetya Ikra Priyadi",
      url: ENV.APP_HOST,
    },
  ],
  openGraph: {
    title:
      "Prasetya Ikra Priyadi - Build your Digital Apps with exceptional User Experiences",
    description:
      "Hi, my name Prasetya Ikra Priyadi. I am building Digital App with exceptional User Experiences. Let's work together",
    url: ENV.APP_HOST,
    siteName: "Prasetya Priyadi Personal Web App",
    emails: [
      "prasetya.ikrapriyadi@gmail.com",
      "contact@prasetyapriyadi.my.id",
      "business@prasetyapriyadi.my.id",
    ],
    locale: "id_ID",
    alternateLocale: ["en_US"],
    countryName: "Indonesia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Prasetya Ikra Priyadi - Build your Digital Apps with exceptional User Experiences",
    description:
      "Hi, my name Prasetya Ikra Priyadi. I am building Digital App with exceptional User Experiences. Let's work together",
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <RootContainer>{children}</RootContainer>;
}
