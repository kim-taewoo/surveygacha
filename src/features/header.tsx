import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BreadcrumbHeaderProps = {
  title: string;
  link?: string;
};

export const BreadcrumbHeader = ({ title, link }: BreadcrumbHeaderProps) => {
  return (
    <div className="flex items-center gap-2 p-4">
      <Link href={link ? link : "/"}>
        <ArrowLeft />
      </Link>
      <span>{title}</span>
    </div>
  );
};
