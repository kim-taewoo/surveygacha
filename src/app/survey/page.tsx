"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { saveAnswer, submitSurvey } from "../actions/SurveyActions";
import { Question } from "../types/page";

// 설문 데이터
const questions: Question[] = [
  {
    id: 1,
    question: "귀하의 연령대를 선택해주세요.",
    options: ["20대", "30대", "40대", "50대", "60대 이상"],
  },
  {
    id: 2,
    question: "평소 온라인 쇼핑을 얼마나 자주 하시나요?",
    options: [
      "주 1회 이상",
      "월 2-3회",
      "월 1회",
      "2-3개월에 1회",
      "거의 하지 않음",
    ],
  },
  {
    id: 3,
    question: "주로 이용하는 쇼핑몰은 어디인가요?",
    options: ["쿠팡", "네이버", "11번가", "G마켓", "기타"],
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); // 현재 질문 단계
  const [answers, setAnswers] = useState<Record<number, string>>({}); // 답변 저장
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태

  // 진행도 계산
  const progress = useMemo(
    () => (currentStep / questions.length) * 100,
    [currentStep],
  );
  // currentStep: 현재 질문 번호
  // questions.length: 총 질문 수
  // useMemo의 역할: currentStep이 변경될 때만 진행도를 다시 계산.

  // 다음 질문으로 이동
  // useCallback : 불필요한 재생성을 방지
  const handleNext = useCallback(async () => {
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1); // 다음 질문으로 이동
    }
    else {
      setIsSubmitting(true); // 제출 중 상태로 전환
      try {
        const result = await submitSurvey(answers); // 설문 제출
        if (result.success) {
          alert("설문 제출 완료\n설문에 참여해 주셔서 감사합니다.");
          router.push("/thankyou"); // 제출 성공 시 리다이렉트
        }
      }
      catch (error) {
        console.error("설문에 실패:", error); // 오류 로그
        alert("제출 실패\n설문 제출 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
      finally {
        setIsSubmitting(false); // 제출 상태 해제
      }
    }
  }, [currentStep, answers, router]); // 의존성 배열

  // 이전 질문으로 이동
  const handlePrev = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  // 선택 옵션 저장
  const handleSelectOption = useCallback(async (questionId: number, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    // setAnswers : React의 상태 업데이트 함수로, answers 상태를 업데이트
    // prev: 현재 answers 상태
    // { ...prev }: 기존 상태를 그대로 복사 = 기존 답변 유지
    // [questionId]: option: 새로운 키-값 쌍을 추가하거나 기존 questionId의 값을 업데이트
    try {
      await saveAnswer(questionId, option);
    }
    catch (error) {
      console.error("설문 실패:", error);
      alert("답변 저장 실패\n답변을 저장하는 중 오류가 발생했습니다.");
    }
  }, []);

  // 현재 질문
  const currentQuestion = useMemo(
    () => questions[currentStep - 1],
    [currentStep],
  );
  // 배열의 인덱스는 0부터 시작하므로, currentStep - 1을 통해 현재 질문에 해당하는 배열 요소를 가져옴.

  // 마지막 질문 여부 확인
  const isLastQuestion = currentStep === questions.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-4">
      <div className="mx-auto max-w-4xl">
        <Card className="border-none bg-white/90 shadow-xl backdrop-blur">
          <CardContent className="p-6">
            {/* 진행 헤더 */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-xl font-semibold">설문 진행</h2>
                <span className="text-sm text-gray-500">
                  {currentStep}

                  /
                  {questions.length}
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2"
                aria-label="설문 진행도"
              />
            </div>

            {/* 질문 및 옵션 */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-medium">
                {currentQuestion.question}
              </h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion.id] === option ? "default" : "outline"}
                    className="w-full justify-start text-left"
                    onClick={() => handleSelectOption(currentQuestion.id, option)}
                    aria-label={`${option} 선택하기`}
                    // aria-label:접근성을 위한 속성/사용자가 화면 읽기 도구를 사용할 때 버튼의 역할을 설명
                  >
                    {option}
                    {/* {option} : 각 버튼의 텍스트로 옵션 내용을 표시 */}
                  </Button>
                ))}
              </div>
            </div>

            {/* 이전/다음 버튼 */}
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
                aria-label="이전 질문으로 이동"
              >
                <ChevronLeft className="size-4" />
                이전
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id] || isSubmitting}
                className="flex items-center gap-2"
                aria-label={isLastQuestion ? "설문 제출하기" : "다음 질문으로 이동"}
              >
                {isLastQuestion ? "제출" : "다음"}
                {!isLastQuestion && <ChevronRight className="size-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
