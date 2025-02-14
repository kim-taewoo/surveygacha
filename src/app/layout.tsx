import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

import { suit, aggroSubset } from "./fonts";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "서베이가챠",
  description: "Survey Gacha!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${suit.variable} ${aggroSubset.variable} bg-[#F4F4F5] font-suit antialiased`}
      >
        <Toaster />
        <Providers>
          <DefaultLayout>
            {children}
          </DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
