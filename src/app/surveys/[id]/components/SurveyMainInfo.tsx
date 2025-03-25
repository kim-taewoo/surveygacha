import { Calendar, Clock, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { GachaReward, Reward, Survey } from "@/types";
import { formatDateToKST } from "@/utils";

import { TargetAudience } from "../../../../features/survey/gen/types";

import { RewardsSection } from "./RewardsList";

interface Props {
  survey: Survey & { gacha_rewards?: (GachaReward & { rewards?: Reward | null })[]; questionsCount: { count: number }[] };
  className?: string;
}

export function SurveyMainInfo({ survey, className }: Props) {
  const questionsCount = survey.questionsCount?.[0]?.count ?? 0;

  return (
    <div className={cn("flex flex-col items-center gap-8 px-5 pt-6", className)}>

      <div className="flex w-full flex-col gap-4">
        <h1 className="text-xl font-bold text-neutral-900">
          {survey.title}
        </h1>
        <p className="text-base font-normal text-neutral-700">
          {survey.description}
        </p>
      </div>

      <div className="w-full space-y-3 text-sm">
        <div className="flex items-center gap-3 rounded-md bg-neutral-100 p-4">
          <User size={18} className="text-neutral-500" />
          <span className="text-neutral-500">설문 대상</span>
          <span className="ml-auto font-semibold text-neutral-800">
            {((survey?.metadata as any)?.["target_audience"] as TargetAudience | null)?.primary_audience || "불특정다수"}
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-md bg-neutral-100 p-4">
          <Clock size={18} className="text-neutral-500" />
          <span className="text-neutral-500">응답 시간</span>
          <span className="ml-auto font-semibold text-neutral-800">
            {questionsCount * 0.5}
            분
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-md bg-neutral-100 p-4">
          <Calendar size={18} className="text-neutral-500" />
          <span className="text-neutral-500">진행 기간</span>
          <span className="ml-auto text-right font-semibold text-neutral-800">
            {(!survey.start_date || !survey.end_date)
              ? "미정"
              : (
                <>
                  {formatDateToKST(survey.start_date)}
                  {" "}
                  -
                  {" "}
                  {formatDateToKST(survey.end_date)}
                </>
              )}
          </span>
        </div>

        <RewardsSection gachaRewards={survey.gacha_rewards ?? []} />
      </div>
    </div>
  );
}
