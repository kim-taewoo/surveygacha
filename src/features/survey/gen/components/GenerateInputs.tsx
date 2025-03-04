"use client";

import { LoaderCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSurvey } from "@/features/survey/stores/useSurvey";

import { QuestionCountsSlider } from "./QuestionCountsSlider";
import { SubjectInput } from "./SubjectInput";
import { TypeToggler } from "./TypeToggler";

const LoadingWithLottie = dynamic(() => import("../../../../components/LoadingWithLottie").then(mod => mod.LoadingWithLottie), {
  loading: () => null,
  ssr: false,
});

export const GenerateInputs = () => {
  const {
    isLoading,
    genInputs,
  } = useSurvey(useShallow(state => ({
    isLoading: state.isLoading,
    genInputs: state.genInputs,
  })));

  return (
    <>
      <div className="flex flex-col gap-5">
        <Button disabled={!genInputs?.subject || isLoading} type="submit" className="h-12 w-full text-base" size="lg">
          {isLoading
            ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" />
                생성중...
              </span>
            )
            : "생성하기"}
        </Button>

        {isLoading && <LoadingWithLottie />}
        {!isLoading && (

          <div className="flex flex-1 flex-col gap-5">
            <SubjectInput />

            <div className="relative flex items-center justify-between gap-3">
              <Separator className="shrink" />
              <div className="shrink-0 grow text-sm opacity-70">세부설정</div>
              <Separator className="shrink" />
            </div>

            <TypeToggler />
            <QuestionCountsSlider />
          </div>
        )}

      </div>
    </>
  );
};
