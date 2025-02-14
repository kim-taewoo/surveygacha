"use client";

import dynamic from "next/dynamic";

import animationData from "@/assets/gacha-machine.json";

const LottieContainer = dynamic(() => import("@/components/LottieContainer").then(mod => mod.LottieContainer), {
  loading: () => null,
  ssr: false,
});

interface Props {

}

export function GachaMachineAnimation({}: Props) {
  return (
    <LottieContainer className="mx-auto mt-6 w-1/2 translate-x-10" animationData={animationData} />
  );
}
