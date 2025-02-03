"use client";

import { ArrowDown, ArrowUp, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Question } from "../../types";

import QuestionEditor from "./QuestionEditor";

interface Props {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

export function SurveyQuestions({ questions, onQuestionsChange }: Props) {
  if (questions.length === 0) {
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

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    const newQuestions = [...questions];
    const [movedQuestion] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, movedQuestion);
    onQuestionsChange(newQuestions);
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    onQuestionsChange(newQuestions);
  };

  const updateQuestion = (question: Question) => {
    const newQuestions = questions.map(q => (q.id === question.id ? question : q));
    onQuestionsChange(newQuestions);
  };

  return (
    <>
      {questions.map((question, index) => (
        <div key={question.id} className="relative mx-auto flex w-full max-w-2xl flex-col gap-5 rounded-lg bg-white p-5 pt-9 shadow">
          {/* 문항 순서 변경 & 삭제 컨트롤러 */}
          <div className="absolute right-5 top-3 flex items-center gap-0">
            <Button onClick={() => index > 0 && moveQuestion(index, index - 1)} disabled={index === 0} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
              <ArrowUp size={20} />
            </Button>
            <Button onClick={() => index < questions.length - 1 && moveQuestion(index, index + 1)} disabled={index === questions.length - 1} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
              <ArrowDown size={20} />
            </Button>
            <Button onClick={() => deleteQuestion(index)} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
              <X size={20} />
            </Button>
          </div>
          <QuestionEditor question={question} onChange={updateQuestion} />
        </div>
      ))}
    </>
  );
}
