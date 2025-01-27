"use client";

import { Check } from "lucide-react";
import { useState, useEffect } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // Supabase 클라이언트 가져오기

export default function CompletePage() {
  const [showReward, setShowReward] = useState(false);

  // Supabase 데이터 상태
  const [rewardText, setRewardText] = useState<string | null>(null); // 보상 텍스트
  const [rewardDescription, setRewardDescription] = useState<string | null>(null); // 보상 설명

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReward(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showReward) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-5">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#0056EB]">
            <Check className="size-8 text-white" />
          </div>
          <p className="text-xl font-semibold">응답이 완료되었습니다!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col bg-white px-5">
      <div className="mt-[77px] flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          {/* Supabase에서 보상 텍스트를 가져오거나 기본값 표시 */}
          <h1 className="text-2xl font-semibold leading-9">{rewardText || "가차를 통해"}</h1>
          <h1 className="text-2xl font-semibold leading-9">{rewardText || "보상을 얻어보세요"}</h1>
        </div>
        <p className="text-base text-[#6B7280]">
          {/* Supabase에서 보상 설명을 가져오거나 기본값 표시 */}
          {rewardDescription || "가차를 통해 설문조사에 대한 보상을 확인해요"}
        </p>
      </div>

      <div className="mt-[110px] flex w-full flex-1 items-center justify-center">
        <div className="h-70 relative w-[335px]">
          <img
            src="/images/compensation.png"
            alt="보상 이미지"
            className="size-full object-contain"
          />
        </div>
      </div>

      <div className="sticky bottom-0 mt-[200px] w-full">
        <button className="w-full rounded-xl bg-[#0056EB] py-4 text-base font-medium text-white">
          가차 도전하기
        </button>
      </div>
    </div>
  );
}
