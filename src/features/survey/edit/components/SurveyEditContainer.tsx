"use client";

import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { useSurvey } from "@/stores/useSurvey";

import { Question } from "../../types";

import { SurveyTitleAndDescription } from "./SurveyTitleAndDescription";

const SurveyQuestions = dynamic(() => import("./SurveyQuestions").then(mod => mod.SurveyQuestions), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface Props {
  question: Question;
}

export function SurveyEditContainer({}: Props) {
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
      <SurveyQuestions questions={questions} />
      {/* 질문 추가 버튼 */}
      <Button
        className="h-12 border-primary text-base text-primary"
        variant="outline"
        size="lg"
        onClick={() => setSurveyFieldState(state => ({ questions: [...state.questions, { id: state.questions.length + 1, type: "text", title: "", options: [] }] }))}
      >
        질문 추가하기
        {" "}
        <Plus size={20} />
      </Button>
    </main>
  );
}
