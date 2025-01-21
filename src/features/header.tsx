import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BreadcrumbHeaderProps = {
  title: string;
  link?: string;
};

export const BreadcrumbHeader = ({ title, link }: BreadcrumbHeaderProps) => {
  return (
    <div className="fixed top-0 z-10 flex w-full max-w-3xl items-center gap-2 bg-white p-4 shadow-md">
      <Link href={link ? link : "/"}>
        <ArrowLeft />
      </Link>
      <span>{title}</span>
    </div>
  );
};
