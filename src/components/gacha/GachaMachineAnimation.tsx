"use client";

import dynamic from "next/dynamic";

import animationData from "@/assets/gacha-machine.json";
import { cn } from "@/lib/utils";

const LottieContainer = dynamic(() => import("@/components/LottieContainer").then(mod => mod.LottieContainer), {
  loading: () => null,
  ssr: false,
});

interface Props {
  className?: string;
}

export function GachaMachineAnimation({ className }: Props) {
  return (
    <LottieContainer className={cn("w-1/2", className)} animationData={animationData} />
  );
}
