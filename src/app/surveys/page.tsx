"use client"; // 클라이언트 컴포넌트 설정

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SurveyInfo } from "@/types";

// 설문조사 정보 객체
const surveyInfo: SurveyInfo = {
  title: "설문참여",
  description: "설문조사에 참여해주셔서 감사합니다",
  duration: "약 10-15분",
  targetAge: "만 20세 이상",
  reward: "설문 완료시 포인트 지급",
};

// Home 컴포넌트
export default function Home() {
  return (

    <main className="p-4">

      {/* 메인 배경 */}
      <div className="mx-auto">

        {/* 콘텐츠 중앙 정렬 */}
        <Card className="border-none bg-white/80 shadow-lg backdrop-blur">
          <CardContent className="p-6">
            {/* 헤더 섹션 */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-4xl font-bold">{surveyInfo.title}</h1>
              <p className="text-lg text-gray-600">{surveyInfo.description}</p>
            </div>

            {/* 설문 정보 섹션 */}
            <div className="mb-8 space-y-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 font-semibold">설문 정보</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    • 설문 소요 시간:
                    {surveyInfo.duration}
                  </p>
                  <p>
                    • 참여 대상:
                    {surveyInfo.targetAge}
                  </p>
                  <p>
                    • 보상:
                    {surveyInfo.reward}
                  </p>
                </div>
              </div>

              {/* 참여자 정보 섹션 */}
              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 font-semibold">도움된 기타 상품들</h2>
                <p className="text-sm text-gray-600">참여자 수: 현재 참여자 수 / 최대 참여</p>
              </div>
            </div>

            {/* 시작 버튼 */}
            <div className="flex justify-center">
              <Link href="/survey">
                <Button
                  size="lg"
                  className="px-8 "
                  aria-label="설문조사 시작하기"
                >
                  설문 시작하기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
