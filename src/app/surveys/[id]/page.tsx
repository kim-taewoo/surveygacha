"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SurveyMainInfo } from "@/features/survey/survey-info/SurveyMainInfo";

// 설문 데이터 타입 정의
interface SurveyInfo {
  title: string;
  subTitle: string;
  target: string;
  duration: string;
  period: string;
  reward: string;
  participants: number;
}

// 목데이터
const surveyInfo: SurveyInfo = {
  title: "금융 생활 관련 설문 참여 모집",
  subTitle: "안녕하세요! 👋 사이드 프로젝트를 진행 중인 학생입니다. 평소 금융 생활에 관련하여 라이프 스타일을 여쭤보았습니다. 조사에 참여해주신 분들께 보상을 제공해드립니다. ✨",
  target: "불특정다수",
  duration: "3-5분",
  period: "2025.01.01 - 2025.01.26",
  reward: "메가커피 아메리카노",
  participants: 13,
};

export default function SurveyPage() {
  const [survey, setSurvey] = useState<SurveyInfo | null>(null); // 설문 데이터 상태

  throw new Error("Not implemented");

  return (
    <div className="flex w-full flex-col pb-24">
      {/* 헤더 섹션 */}
      <header className="px-5 pb-[18px] pt-7">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="로고"
            width={71.03}
            height={20}
          />
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <SurveyMainInfo survey={surveyInfo} />
      {/* 말풍선 */}
      <div className="fixed bottom-[88px]  px-5">
        <div className="relative inline-block">
          <div className="flex items-center gap-2 rounded-md bg-[#262626] px-3 py-2 text-[12px] text-white">
            현재
            <span>
              <strong>{survey?.participants || surveyInfo.participants}</strong>
              <span className="font-bold">명</span>
              <span>이</span>
            </span>
            참여중 🔥
          </div>
          {/* 말풍선 꼬리 */}
          <div className="absolute left-4 top-full size-0 border-x-4 border-t-8 border-x-transparent border-t-[#262626]" />
        </div>
      </div>

      {/* 시작하기 버튼 */}
      <div className="fixed bottom-0 mb-2 w-full max-w-md p-5">
        {/* TODO: 제대로 수정 */}
        <Link href="/">
          <Button className="h-12 w-full gap-2 bg-[#0056EB] px-3 py-2 text-lg font-medium text-white hover:bg-blue-700">
            시작하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
