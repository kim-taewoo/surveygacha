import type { Metadata } from "next";
import { suit, aggroSubset } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "서베이가챠",
  description: "Survey Gacha!"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${suit.variable} ${aggroSubset.variable} font-suit antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
