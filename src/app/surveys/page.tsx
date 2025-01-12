"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface SurveyInfo {
  title: string;
  subTitle: string;
  target: string;
  duration: string;
  period: string;
  reward: string;
  participants: number;
}

const surveyInfo: SurveyInfo = {
  title: "금융 생활 관련 설문 참여 모집",
  subTitle: "안녕하세요! 👋 사이트 프로젝트를 진행 중인 학생입니다. 평소 금융 생활에 관련하여 라이프 스타일을 여쭤보았습니다. 조사에 참여해주신 분들께 보상을 제공해드립니다. ✨",
  target: "불특정다수",
  duration: "3-5분",
  period: "2025.01.01 - 2025.01.26",
  reward: "메가커피 아메리카노",
  participants: 13,
};

export default function SurveyPage({ params }: { params: { dynamicId: string } }) {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="p-4">
        <h2 className="text-lg text-gray-500">서베이가차</h2>
      </header>

      <main className="p-4">
        <div className="space-y-6">
          {/* Title and Description */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{surveyInfo.title}</h1>
            <p className="text-gray-600">{surveyInfo.subTitle}</p>
          </div>

          {/* Survey Information */}
          <div className="space-y-4 rounded-lg bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-gray-200" />
              <span className="text-gray-600">설문 대상</span>
              <span className="ml-auto">{surveyInfo.target}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-gray-200" />
              <span className="text-gray-600">응답 시간</span>
              <span className="ml-auto">{surveyInfo.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-gray-200" />
              <span className="text-gray-600">진행 기간</span>
              <span className="ml-auto">{surveyInfo.period}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-gray-200" />
              <span className="text-gray-600">보상 품목</span>
              <span className="ml-auto">{surveyInfo.reward}</span>
            </div>
          </div>

          {/* Participants Count */}
          <div className="relative w-fit">
            <div className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white">
              현재
              {surveyInfo.participants}
              명이 참여중 🔥
            </div>
          </div>

          {/* Start Button */}
          <Link href={`/surveys/${params.dynamicId}/survey`} className="block">
            <Button className="h-14 w-full bg-blue-600 text-lg font-medium hover:bg-blue-700">
              시작하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
