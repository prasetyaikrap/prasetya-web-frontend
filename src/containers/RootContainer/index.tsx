import { Inter } from "next/font/google";

import Providers from "./Providers";
import { RootContainerProps } from "./type";

const inter = Inter({ subsets: ["latin"] });

export default function RootContainer({ children }: RootContainerProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
