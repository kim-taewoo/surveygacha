import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  backHref?: string;
}

export async function BackButtonHeader({ title, backHref = "/" }: Props) {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="p-4">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-2 text-xl font-semibold">
          <Link href={backHref}>
            <ChevronLeft className="size-6 cursor-pointer" />
          </Link>
          {title}
        </div>
      </div>
    </header>
  );
}
