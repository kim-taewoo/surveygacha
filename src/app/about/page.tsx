import Image from "next/image";
import Link from "next/link";

import { Bomb } from "@/assets/Bomb";
import animationData from "@/assets/gacha-machine.json";
import { Won } from "@/assets/Won";
import { LottieContainer } from "@/components/LottieContainer";
import { ScaleWrapper } from "@/components/ScaleWrapper";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { SurveyMainInfo } from "@/features/survey/survey-info/SurveyMainInfo";

import { CapsulesSVG } from "./CapsulesSVG";
import { CustomCheckIcon } from "./CustomCheckIcon";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#E5EFFF] pb-36">
      <div className="flex w-full items-center justify-between border-b px-5 py-[18px]">
        <Logo width={71} height={20} />
        <div className="flex items-center">
          <Link href="/login">
            <div className="text-[#7B7B7B]">로그인</div>
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col">
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
        <div className="relative mt-10">
          <div className="absolute right-5 top-0 z-10 flex items-center gap-2 rounded-full bg-white px-3 py-2 font-semibold shadow">
            <CustomCheckIcon />
            {" "}
            10초만에 생성 완료!
          </div>
          <ScaleWrapper className="mt-6" scale={0.78}>
            <SurveyMainInfo
              className="rounded-r-lg bg-neutral-50 px-11 pb-2 pt-8"
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

        {/* Section3 */}
        <div className="flex flex-col gap-4 px-5">
          <div className="text-sm font-semibold text-primary/90">
            설문조사 자동 생성
          </div>
          <div className="text-2xl font-semibold">
            AI를 활용하여
            <br />
            10초만에 자동 생성
          </div>
          <div className="text-sm text-muted-foreground">
            설문 주제, 유형, 질문 개수만 설정하면 빠르게 제작되어
            <br />
            시간을 단축하고 편리함을 제공합니다.
          </div>

          <div className="relative min-h-[500px] w-full">
            <div className="absolute left-0 top-0 z-30 w-[70%] rounded-lg bg-white px-2 py-3 shadow">
              <div className="font-semibold">
                설문 주제
              </div>
              <div className="mt-2 rounded-md border p-1 text-sm">
                전국민 금융 이해력 조사
              </div>
            </div>
            <div className="absolute right-0 top-[55px] z-10 w-[65%] rounded-lg bg-white px-2 py-3 shadow">
              <Image
                alt="예시"
                src="/images/question-example.png"
                width={252}
                height={300}
              />
            </div>
          </div>
        </div>

        {/* Section4 */}
        <div className="mt-10 flex flex-col gap-4 px-5">
          <div className="text-sm font-semibold text-primary/90">
            가챠 시스템
          </div>
          <div className="text-2xl font-semibold">
            참여율을 올리기 위한
            <br />
            가챠 시스템
          </div>
          <div className="text-sm text-muted-foreground">
            설문 참여자들에게 보상을 제공할 때
            <br />
            가챠 요소를 활용하여 더 많은 참여를 유도합니다.
          </div>

          <div className="relative mt-14 w-full pb-8">
            <div className="absolute left-0 top-0 z-10 flex w-3/5 items-center gap-2 rounded-lg bg-white px-2 py-1 shadow">
              <Won width={48} height={48} />
              <div className="text-sm font-semibold">
                <div>축하합니다!</div>
                <div>경품에 당첨되었습니다</div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 z-10 flex w-1/2 items-center gap-2 rounded-lg bg-white px-2 py-1 shadow">
              <Bomb width={36} height={36} />
              <div className="text-xs font-semibold">
                <div>꽝입니다</div>
                <div>다음 기회를 노리세요</div>
              </div>
            </div>
            <div className="absolute bottom-0 left-10">
              <CapsulesSVG />
            </div>
            <LottieContainer className="mx-auto mt-6 w-1/2 translate-x-10" animationData={animationData} />
          </div>
        </div>

        {/* 분석 관련해 기능 추가 */}
      </div>
    </div>
  );
}
