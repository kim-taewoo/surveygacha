"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSurvey } from "@/features/survey/stores/useSurvey";

import { SurveyQuestion } from "./SurveyQuestion";

export function SurveyQuestions() {
  const getQuestionIds = useSurvey(state => state.getQuestionIds);

  const questionIds = getQuestionIds();

  if (questionIds.length === 0) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="p-6 text-center">
          <p>
            아래 버튼을 눌러 질문을 추가해주세요
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {questionIds.map((questionId, index) => (
        <SurveyQuestion key={questionId} questionId={questionId} questionsLength={questionIds.length} index={index} />
      ))}
    </>
  );
}
