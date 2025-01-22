import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div className="m-auto flex w-full max-w-lg flex-col">{children}</div>;
}
