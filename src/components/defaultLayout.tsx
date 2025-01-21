import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div className="m-auto flex max-w-3xl">{children}</div>;
}
