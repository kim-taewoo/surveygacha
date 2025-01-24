import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  link?: string;
};

export const BackArrowHeader = ({ title, link = "/" }: Props) => {
  return (
    <div className="flex w-full items-center gap-2 p-5">
      <Link href={link}>
        <ChevronLeft />
      </Link>
      <span className="text-xl font-semibold">{title}</span>
    </div>
  );
};
