import { ArrowDown, ArrowUp, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { useSurvey } from "@/features/survey/stores/useSurvey";

import { Question } from "../../types";

import QuestionEditor from "./question-editor/QuestionEditor";

interface Props {
  question: Question;
  index: number;
  questionsLength: number;
}

export function SurveyQuestion({ question, index, questionsLength }: Props) {
  const { removeQuestion, moveQuestionDown, moveQuestionUp } = useSurvey(useShallow(state => ({
    removeQuestion: state.removeQuestion,
    moveQuestionUp: state.moveQuestionUp,
    moveQuestionDown: state.moveQuestionDown,
  })));

  return (
    <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-5 rounded-lg bg-white p-5 pt-9 shadow">
      {/* 문항 순서 변경 & 삭제 컨트롤러 */}
      <div className="absolute right-5 top-3 flex items-center gap-0">
        <Button onClick={() => moveQuestionUp(question.id)} disabled={index === 0} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
          <ArrowUp size={20} />
        </Button>
        <Button onClick={() => moveQuestionDown(question.id)} disabled={index === questionsLength - 1} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
          <ArrowDown size={20} />
        </Button>
        <Button onClick={() => removeQuestion(question.id)} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
          <X size={20} />
        </Button>
      </div>
      <QuestionEditor questionId={question.id} />
    </div>
  );
}
