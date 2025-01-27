import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type BreadcrumbHeaderProps = {
  title: string;
  link?: string;
};

export const BreadcrumbHeader = ({ title, link }: BreadcrumbHeaderProps) => {
  return (
    <div className="fixed top-0 z-10 flex w-full max-w-lg items-center gap-2 bg-[#f4f4f5] p-4 text-xl font-semibold">
      <Link href={link ? link : "/"}>
        <ChevronLeft />
      </Link>
      <span>{title}</span>
    </div>
  );
};
