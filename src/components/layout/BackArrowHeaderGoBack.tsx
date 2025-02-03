"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
};

export const BackArrowHeaderGoBack = ({ title }: Props) => {
  const router = useRouter();
  return (
    <div className="flex w-full items-center gap-2 p-5">

      <button onClick={() => router.back()}>
        <ChevronLeft />
      </button>

      <span className="text-xl font-semibold">{title}</span>
    </div>
  );
};
