import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div className="m-auto flex min-h-screen w-full max-w-lg flex-col">{children}</div>;
}
