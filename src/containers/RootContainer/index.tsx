import { Inter } from "next/font/google";
import { RootContainerProps } from "./type";
import Wrapper from "./Wrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootContainer({ children }: RootContainerProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
