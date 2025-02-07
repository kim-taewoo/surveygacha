import { Calendar, Clock, Gift, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Survey } from "@/types";
import { formatDateToKST } from "@/utils";

import { TargetAudience } from "../gen/types";
import { Question } from "../types";

interface Props {
  survey: Partial<Survey>;
  className?: string;
}

export function SurveyMainInfo({ survey, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center gap-8 px-5 pt-6", className)}>

      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold text-[#171717]">
          {survey.title}
        </h1>
        <p className="text-base font-normal text-[#404040]">
          {survey.description}
        </p>
      </div>

      <div className="w-full space-y-3 text-sm">
        <div className="flex items-center gap-3 rounded-md bg-[#F5F5F5] p-4">
          <User className="text-[#737373]" />
          <span className="text-[#737373]">설문 대상</span>
          <span className="ml-auto font-semibold text-[#262626]">
            {(survey.target_audience as TargetAudience | null)?.primary_audience || "불특정다수"}
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-md bg-[#F5F5F5] p-4">
          <Clock className="text-[#737373]" />
          <span className="text-[#737373]">응답 시간</span>
          <span className="ml-auto font-semibold text-[#262626]">
            {((survey.questions ?? []) as Question[]).length * 0.5}
            분
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-md bg-[#F5F5F5] p-4">
          <Calendar className="text-[#737373]" />
          <span className="text-[#737373]">진행 기간</span>
          <span className="ml-auto text-right font-semibold text-[#262626]">
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

        <div className="flex items-center gap-3 rounded-md bg-[#F5F5F5] p-4">
          <Gift className="text-[#737373]" />
          <span className="text-[#737373]">보상 품목</span>
          <span className="ml-auto font-semibold text-[#262626]">
            {/* {survey.reward} */}
            아이스 아메리카노
          </span>
        </div>
      </div>
    </div>
  );
}
