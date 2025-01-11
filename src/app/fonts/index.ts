import localFont from "next/font/local";

export const suit = localFont({
  src: "./suit-variable.woff2",
  variable: "--font-suit",
  display: "swap"
});

export const aggroSubset = localFont({
  src: "./sb_aggro_subset.woff2",
  variable: "--font-aggro-subset",
  display: "swap"
});
