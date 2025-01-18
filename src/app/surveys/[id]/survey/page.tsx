"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback, startTransition } from "react";

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

// 선택지 버튼 컴포넌트
function OptionButton({
  selected,
  onClick,
  children,
  isCheckbox,
  disabled,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isCheckbox?: boolean;
  disabled?: boolean;
}) {
  const buttonClasses = `
    flex h-[52px] w-full items-center justify-between rounded-lg px-4 mb-3
    ${selected
      ? `border ${isCheckbox ? "border-[#0056EB]" : "border-[#0056EB]"} bg-[#F0F4FF]`
      : "bg-[#F5F5F5] hover:bg-[#F0F4FF]"}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      <span className="text-base text-[#262626]">{children}</span>
      <div className={`
        flex size-5 items-center justify-center border-2
        ${isCheckbox ? "rounded-md" : "rounded-full"}
        ${selected
      ? "border-[#0056EB] bg-[#0056EB]"
      : "border-gray-300 bg-white"}
      `}
      >
        {selected && <Check className="size-3 text-white" />}
      </div>
    </button>
  );
}

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
    if (!isLastQuestion) { // 현재 단계가 마지막 질문이 아닌 경우
      startTransition(() => setCurrentStep(prev => prev + 1)); // 현재 단계 증가 (다음 질문으로 이동)
    }
    else {
      setIsSubmitting(true); // 설문 제출 상태로 설정
      setTimeout(() => {
        router.push("/surveys/[id]/complete"); // 완료 페이지로 이동
      }, 1000); // 1초 후에 완료 페이지로 이동
    }
  }, [isLastQuestion, router]);

  // 이전 단계로 이동
  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* 진행 상태 바 */}
      <div className="h-[14px] w-full bg-[#D1E2FF]">
        <div
          className="h-full bg-[#0056EB] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="px-5 pt-12">
        {/* 질문 헤더 */}
        <p className="text-sm text-gray-600">* 필수 입력</p>
        <h3 className="mb-6 text-lg font-normal">
          {currentQuestion.question}
        </h3>

        {/* 단일 선택 질문 */}
        {currentQuestion.type === "multiple-choice" && (
          <div className="space-y-3">
            {currentQuestion.options?.map(option => (
              <OptionButton
                key={option}
                selected={answers[currentQuestion.id]?.[0] === option}
                onClick={() => handleSingleSelect(currentQuestion.id, option)}
                disabled={isSubmitting}
              >
                {option}
              </OptionButton>
            ))}
          </div>
        )}

        {/* 다중 선택 질문 */}
        {currentQuestion.type === "multiple-select" && (
          <div className="space-y-3">
            {currentQuestion.options?.map(option => (
              <OptionButton
                key={option}
                selected={answers[currentQuestion.id]?.includes(option)}
                onClick={() => handleMultipleSelect(currentQuestion.id, option)}
                isCheckbox
                disabled={isSubmitting}
              >
                {option}
              </OptionButton>
            ))}
          </div>
        )}

        {/* 주관식 질문 */}
        {currentQuestion.type === "text" && (
          <div className="w-full rounded-lg border-0 bg-[#F5F5F5] p-4">
            <textarea
              placeholder="답변을 입력해주세요."
              value={answers[currentQuestion.id]?.[0] || ""}
              onChange={e => handleTextAnswer(currentQuestion.id, e.target.value)}
              className="min-h-[112px] w-full resize-none border-0 bg-transparent p-0 text-base outline-none"
              disabled={isSubmitting}
            />
          </div>
        )}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-5">
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="h-12 flex-1 rounded-lg border-0 bg-[#A3A3A3] px-3 py-2 text-base font-medium text-white"
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
