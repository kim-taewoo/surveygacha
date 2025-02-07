import animationData from "@/assets/gacha-machine.json";
import { cn } from "@/lib/utils";

import { LottieContainer } from "../LottieContainer";

interface Props {
  className?: string;
}

export const LoadingWithLottie = ({ className }: Props) => {
  return (
    <div className={cn("fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center", className)}>
      <LottieContainer className="min-h-60" animationData={animationData} />
      <div className="mt-5 text-2xl font-semibold">
        조금만 기다려 주세요!
      </div>
    </div>
  );
};
