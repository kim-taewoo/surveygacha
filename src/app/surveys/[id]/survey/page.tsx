"use client";
// 설문 조사 페이지 컴포넌트
import { useRouter } from "next/navigation";
import { useState, useCallback, startTransition } from "react";

import { MultipleChoiceQuestion } from "@/features/surveys/MultipleChoiceQuestion";
import { MultipleSelectQuestion } from "@/features/surveys/MultipleSelectQuestion";
import { ProgressBar } from "@/features/surveys/ProgressBar";
import { QuestionHeader } from "@/features/surveys/QuestionHeader";
import { TextQuestion } from "@/features/surveys/TextQuestion";

// 질문 타입 정의
interface Question {
  id: number;
  question: string;
  type: "multiple-choice" | "multiple-select" | "text";
  options?: string[];
  required: boolean;
}

// 답변 타입 정의
type Answers = Record<number, string[]>;

// 질문 목데이터
const questions: Question[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "귀하의 연령대를 선택해주세요.",
    options: ["20대", "30대", "40대", "50대", "60대 이상"],
    required: true,
  },
  {
    id: 2,
    type: "multiple-select",
    question: "현재 사용중인 은행을 모두 선택해주세요.",
    options: ["농협 은행", "하나 은행", "국민 은행", "신한 은행", "카카오뱅크"],
    required: true,
  },
  {
    id: 3,
    type: "text",
    question: "자주 사용하시는 금융 서비스에 대해 자유롭게 작성해주세요.",
    required: true,
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentStep - 1];
  const isLastQuestion = currentStep === questions.length;
  const progress = (Object.keys(answers).length / questions.length) * 100;

  // 단일 선택 처리
  const handleSingleSelect = useCallback((id: number, option: string) => {
    setAnswers(prev => ({ ...prev, [id]: [option] }));
  }, []);

  // 다중 선택 처리
  const handleMultipleSelect = useCallback((id: number, option: string) => {
    setAnswers((prev) => {
      const currentAnswers = prev[id] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(item => item !== option)
        : [...currentAnswers, option];
      return { ...prev, [id]: newAnswers };
    });
  }, []);

  // 텍스트 입력 처리
  const handleTextAnswer = useCallback((id: number, text: string) => {
    setAnswers(prev => ({ ...prev, [id]: [text] }));
  }, []);

  // 다음 단계로 이동
  const handleNext = useCallback(() => {
    if (!isLastQuestion) {
      startTransition(() => setCurrentStep(prev => prev + 1));
    }
    else {
      setIsSubmitting(true);
      setTimeout(() => {
        router.push("/surveys/[id]/complete");
      }, 1000);
    }
  }, [isLastQuestion, router]);

  // 이전 단계로 이동
  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  return (
    <main className="min-h-screen w-full bg-white pb-24">
      <ProgressBar progress={progress} />

      <div className="px-5 pt-12">
        <QuestionHeader question={currentQuestion.question} />

        {currentQuestion.type === "multiple-choice" && (
          <MultipleChoiceQuestion
            id={currentQuestion.id}
            options={currentQuestion.options || []}
            selectedAnswer={answers[currentQuestion.id]?.[0]}
            onSelect={handleSingleSelect}
            isSubmitting={isSubmitting}
          />
        )}

        {currentQuestion.type === "multiple-select" && (
          <MultipleSelectQuestion
            id={currentQuestion.id}
            options={currentQuestion.options || []}
            selectedAnswers={answers[currentQuestion.id] || []}
            onSelect={handleMultipleSelect}
            isSubmitting={isSubmitting}
          />
        )}

        {currentQuestion.type === "text" && (
          <TextQuestion
            id={currentQuestion.id}
            answer={answers[currentQuestion.id]?.[0] || ""}
            onAnswer={handleTextAnswer}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="fixed bottom-0 w-full max-w-lg p-5">
        <div className="flex justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="h-12 flex-1 rounded-lg bg-[#A3A3A3] px-3 py-2 text-base font-medium text-white"
          >
            이전으로
          </button>
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]?.length || isSubmitting}
            className="h-12 flex-1 rounded-lg bg-[#0056EB] px-3 py-2 text-base text-white disabled:bg-gray-300"
          >
            {isLastQuestion ? "제출하기" : "다음으로"}
          </button>
        </div>
      </div>

    </main>
  );
}
