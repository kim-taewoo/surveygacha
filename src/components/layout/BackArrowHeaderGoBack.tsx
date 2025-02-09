"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
};

export const BackArrowHeaderGoBack = ({ title, className }: Props) => {
  const router = useRouter();
  return (
    <div className={cn("flex w-full items-center gap-2 p-5", className)}>

      <button onClick={() => router.back()}>
        <ChevronLeft />
      </button>

      <span className="text-xl font-semibold">{title}</span>
    </div>
  );
};
