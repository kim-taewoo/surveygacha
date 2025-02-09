import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div className="relative m-auto flex min-h-screen w-full max-w-md flex-col">{children}</div>;
}
