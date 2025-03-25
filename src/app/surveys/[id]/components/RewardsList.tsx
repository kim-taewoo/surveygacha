"use client";

import { Gift } from "lucide-react";
import React, { useState } from "react";

import { GachaReward, Reward } from "@/types";

export const RewardsSection = ({ gachaRewards }: { gachaRewards: (GachaReward & { rewards?: Reward | null })[] }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="flex flex-col gap-2 rounded-md bg-neutral-100 p-4"
      onClick={toggleExpand}
    >
      <div className="flex items-center">
        <Gift size={18} className="text-neutral-500" />
        <span className="ml-2 text-neutral-500">보상 품목</span>
        <span className="ml-auto cursor-pointer text-sm text-neutral-500">
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
