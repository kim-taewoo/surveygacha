"use client";

import { SliderWithTicks } from "@/components/ui/originui/SliderWithTicks";
import { useSurvey } from "@/stores/useSurvey";

import { DEFAULT_MINIMUM_QUESTION_COUNT } from "../consts";

export const QuestionCountsSlider = () => {
  const questionCount = useSurvey(state => state.genInputs.question_counts);
  const setGenInput = useSurvey(state => state.setGenInput);
  const setGenInputError = useSurvey(state => state.setGenInputError);
  const errorMessage = useSurvey(state => state.genInputs.errors.question_counts);

  function handleQuestionCountChange(value: number) {
    if (value < DEFAULT_MINIMUM_QUESTION_COUNT) {
      setGenInput("question_counts", DEFAULT_MINIMUM_QUESTION_COUNT);
      setGenInputError("question_counts", `문항 개수는 최소 ${DEFAULT_MINIMUM_QUESTION_COUNT}개 이상이어야 합니다.`);
      setTimeout(() => {
        setGenInputError("question_counts", undefined);
      }, 2500);
      return;
    }
    setGenInput("question_counts", value);
    setGenInputError("question_counts", "");
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-3 py-4">
      <h1 className="text-xl font-semibold leading-6">
        설문 개수
      </h1>
      <div className="flex gap-1">
        <span className="text-[#2563EB]">Tip.</span>
        <span>
          응답자의 집중력을 고려하여 질문 수를 조절합니다.
        </span>
      </div>
      <div>
        <SliderWithTicks errorMessage={errorMessage} value={questionCount} onChange={handleQuestionCountChange} />
      </div>

    </div>
  );
};
