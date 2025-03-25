"use client";

import { CircleHelpIcon, Gift } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GachaReward, Reward } from "@/types";

export const RewardsSection = ({ gachaRewards }: { gachaRewards: (GachaReward & { rewards?: Reward | null })[] }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="flex flex-col gap-2 rounded-md bg-neutral-100 p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Gift size={18} className="text-neutral-500" />
          <span className="ml-2 text-neutral-500">가챠 보상</span>
          <Popover>
            <PopoverTrigger asChild>
              <button className="ml-1">
                <CircleHelpIcon className="size-4 text-neutral-500" strokeWidth={1.4} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[280px] py-3 shadow-none" side="top">
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-[13px] font-medium">가챠 보상이 뭔가요?</p>
                  <p className="text-xs text-muted-foreground">
                    설문을 완료하면 설문을 만든 사람이 등록한 보상을 확률적으로 얻을 수 있는 가챠권을 받게 됩니다. 행운을 시험해 보세요! ⭐️
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <span
          onClick={toggleExpand}
          className="ml-auto cursor-pointer text-sm text-neutral-500"
        >
          {isExpanded ? "접기" : "펼치기"}
        </span>
      </div>

      {isExpanded
        ? (
          <div className="mt-3 space-y-3" onClick={e => e.stopPropagation()}>
            {gachaRewards?.map((gachaReward, index) => (
              <div key={index} className="flex items-center justify-between rounded-md bg-white p-3">
                <div className="flex items-center">
                  <span className="font-medium text-neutral-800">{gachaReward?.rewards?.name}</span>
                </div>
                <span className="rounded-full bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-600">
                  {(gachaReward?.probability ?? 0) * 100 || "?"}
                  %
                </span>
              </div>
            ))}
          </div>
        )
        : null}
    </div>
  );
};
