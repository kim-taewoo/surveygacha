"use client";

import { ReactNode, useEffect } from "react";
// @ts-ignore
import ScrollOut from "scroll-out";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    ScrollOut();
  }, []);

  return children;
}
