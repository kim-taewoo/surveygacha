"use client";

import { generateId } from "ai";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { useSurvey } from "@/stores/useSurvey";

import { SurveyTitleAndDescription } from "./SurveyTitleAndDescription";

const SurveyQuestions = dynamic(() => import("./SurveyQuestions").then(mod => mod.SurveyQuestions), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export function SurveyEditContainer() {
  const {
    title,
    description,
    questions,
    setSurveyFieldState,
  } = useSurvey(useShallow(state => ({
    title: state.title,
    description: state.description,
    questions: state.questions,
    setSurveyFieldState: state.setSurveyFieldState,
  })));

  return (
    <main className="flex flex-col gap-5 px-5 pb-16">
      <Button className="h-12 w-full text-base" size="lg">
        작성 완료
      </Button>
      <SurveyTitleAndDescription title={title} description={description} onChange={setSurveyFieldState} />
      <SurveyQuestions questions={questions} onQuestionsChange={questions => setSurveyFieldState("questions", questions)} />
      {/* 질문 추가 버튼 */}
      <Button
        className="h-12 border-primary text-base text-primary"
        variant="outline"
        size="lg"
        onClick={() => setSurveyFieldState("questions", [...questions, { id: generateId(), text: "", isRequired: true, type: "single_choice" }])}
      >
        <Plus size={20} />
        {" "}

        질문 추가하기
      </Button>
    </main>
  );
}
