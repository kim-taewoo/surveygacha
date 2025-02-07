import Image from "next/image";
import Link from "next/link";

import { ScaleWrapper } from "@/components/ScaleWrapper";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { SurveyMainInfo } from "@/features/survey/survey-info/SurveyMainInfo";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#E5EFFF]">
      <div className="flex w-full items-center justify-between border-b px-5 py-[18px]">
        <Logo width={71} height={20} />
        <div className="flex items-center">
          <Link href="/login">
            <div className="text-[#7B7B7B]">로그인</div>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex-col gap-5">
        {/* Section1 */}
        <div className="px-5 py-12 text-center">
          <div className="text-2xl font-bold leading-relaxed">
            AI로 쉽게 설문조사 만들고
            <br />
            가챠로 보상받는 재미까지
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            AI를 통해 간편하게 설문조사를 제작할 수 있게 도와주며,
            <br />
            참가자에게는 가챠를 활용하여 다양한 보상을 제공합니다.
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/login">
              <Button className="h-12 rounded-lg text-base">
                서비스 시작하기
              </Button>
            </Link>
          </div>
        </div>

        {/* Section2 */}
        <div className="px-5 py-12">
          <ScaleWrapper scale={0.78}>
            <SurveyMainInfo
              className="rounded-lg bg-white pb-3"
              survey={{
                title: "금융 생활 관련 설문 참여 모집",
                description: "안녕하세요! 👋 사이드 프로젝트를 진행 중인 학생입니다. 평소 금융 생활에 관련하여 라이프 스타일을 여쭤보았습니다. 조사에 참여해주신 분들께 보상을 제공해드립니다. ✨",
                questions: Array(6).fill({}),
                start_date: "2025.01.01",
                end_date: "2025.01.26",
              }}
            />
          </ScaleWrapper>
        </div>

        {/* 분석 관련해 기능 추가되면 주석제거 */}
        {/* <div className="px-5 py-12 text-center">
          <div className="text-2xl font-bold leading-relaxed">
            설문조사 결과를 AI가
            <br />
            쉽게 분석해드립니다
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            설문조사 결과를 AI가 분석하여,
            <br />
            보다 쉽게 결과를 확인할 수 있습니다.
          </div>
        </div> */}
      </div>
    </div>
  );
}
