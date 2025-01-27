"use client";

import { useShallow } from "zustand/react/shallow";

import { TextareaWithButton } from "@/components/ui/originui/TextareaWithButton";
import { useSurvey } from "@/stores/useSurvey";

import { generateSurvey } from "../actions";

export const SubjectInput = () => {
  const { genInputs, setGenInput, setRawResponse, setIsLoading } = useSurvey(useShallow(state => ({
    genInputs: state.genInputs,
    setGenInput: state.setGenInput,
    setRawResponse: state.setRawResponse,
    genRawResponse: state.genRawResponse,
    setIsLoading: state.setIsLoading,
  })));

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await generateSurvey(genInputs);
    if (!response) return;
    console.log(response, "답변");
    setRawResponse(response);
    setIsLoading(false);
  };

  const setInput = (value: string) => {
    setGenInput("subject", value);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-3 py-4">
      <h1 className="text-xl font-semibold leading-6">
        설문 주제
      </h1>
      <p className="flex gap-1">
        <span className="text-[#2563EB]">Tip.</span>
        어떤 정보를 수집하고자 하는지, 누구를 대상으로 하는지 명확하게 목적을 정의합니다.
      </p>
      <div>

        <TextareaWithButton input={genInputs.subject} setInput={setInput} onSubmit={handleSubmit} isLoading={isLoading} placeholder="ex) AI 기술 발전에 대한 인식조사. 취준생이 느낄 수 있는 불안감 위주로" />

      </div>

    </div>
  );
};
