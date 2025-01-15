"use client";

import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextareaWithButton } from "@/components/ui/originui/TextareaWithButton";
import { useSurvey } from "@/stores/useSurvey";

import { getResponseFromAI } from "../actions";

export const SurveyTitleInput = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setSurveyFromAI = useSurvey(state => state.setSurveyFromAI);
  const survey = useSurvey(state => state.survey);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await getResponseFromAI(input);
    if (!response) return;
    setSurveyFromAI(response);
    setIsLoading(false);
  };

  return (
    <Card className="mx-5 w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-lg">설문 주제</CardTitle>
        <CardDescription>예시를 참고해 설문 주제를 입력해주세요. 간단한 설명을 덧붙일 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <TextareaWithButton input={input} setInput={setInput} onSubmit={handleSubmit} isLoading={isLoading} placeholder="ex) AI 기술 발전에 대한 인식조사. 취준생이 느낄 수 있는 불안감 위주로" />

        {survey?.survey_title && (
          <div className="mt-5">
            <pre>
              {
                JSON.stringify(survey, null, 2)
              }

            </pre>

          </div>
        )}
      </CardContent>
    </Card>
  );
};
