"use client";

import { SliderWithTicks } from "@/components/ui/originui/SliderWithTicks";
import { useSurvey } from "@/stores/useSurvey";

interface Props {

}

export const QuestionCountsSlider = ({}: Props) => {
  const questionCount = useSurvey(state => state.genInputs.questionCounts);
  const setGenInput = useSurvey(state => state.setGenInput);
  const setGenInputError = useSurvey(state => state.setGenInputError);
  const errorMessage = useSurvey(state => state.genInputs.errors.questionCounts);

  function handleQuestionCountChange(value: number) {
    if (value < 5) {
      setGenInput("questionCounts", 5);
      setGenInputError("questionCounts", "문항 개수는 최소 5개 이상이어야 합니다.");
      return;
    }
    setGenInput("questionCounts", value);
    setGenInputError("questionCounts", "");
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
          {" "}
          <span className="opacity-70">(12~15개 권장)</span>
        </span>
      </div>
      <div>
        <SliderWithTicks errorMessage={errorMessage} value={questionCount} onChange={handleQuestionCountChange} />
      </div>

    </div>
  );
};
