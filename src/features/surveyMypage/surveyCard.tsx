import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SurveyCardProps = {
  title: string;
  startDate: string;
  endDate: string;
  participants?: string;
  winningRatio?: string;
  rewardTitle: string;
  status?: boolean;
  isCompleted?: boolean;
};

export const SurveyCard = ({
  title,
  startDate,
  endDate,
  participants,
  winningRatio,
  rewardTitle,
  status,
  isCompleted,
}: SurveyCardProps) => {
  const formatDateToKST = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // 오늘 날짜와 비교하여 설문 종료 여부 판단
  const today = new Date();
  const endDateObj = new Date(endDate);
  const isSurveyCompleted = endDateObj < today;

  return (
    <Card className="mb-4 size-full min-w-[375px] bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        {isSurveyCompleted
          ? (
            <div className="mt-2 text-right text-xs text-gray-500">
              종료된 설문
            </div>
          )
          : (
            <Button
              variant="outline"
              className={cn("h-8 rounded-md border border-blue-500 px-3 py-1.5 text-sm text-blue-500")}
            >
              링크 복사
            </Button>
          )}

      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">진행 기간</span>

          <span>
            {formatDateToKST(startDate)}
            ~
            {formatDateToKST(endDate)}
          </span>
        </div>

        {participants && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">참가자</span>
            <span className="text-blue-500">
              {participants}
              명
            </span>
          </div>
        )}

        {winningRatio && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">당첨자</span>
            <span className="text-orange-500">
              {winningRatio}
              명
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">보상 품목</span>
          <span>{rewardTitle}</span>
        </div>

        {status !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">당첨 여부</span>
            <span className={status ? "text-blue-500" : "text-red-500"}>
              {status ? "당첨" : "꽝"}
            </span>
          </div>
        )}

      </div>

      {isCompleted && (
        <div className="mt-2 text-right text-xs text-gray-500">
          종료된 설문
        </div>
      )}
    </Card>
  );
};
