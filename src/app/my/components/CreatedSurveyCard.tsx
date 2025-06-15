import { Card, CardContent } from "@/components/ui/card";
import CopyLinkButton from "@/features/link/components/CopyLinkButton";
import { Reward, Survey } from "@/types";

interface Props {
  survey: Survey & {
    response_count: { count: number }[];
    rewards: Reward[];
  };
}

export function CreatedSurveyCard({ survey }: Props) {
  const { title, end_date, rewards, slug } = survey;

  const isEnded = end_date && new Date(end_date) < new Date();

  console.log(survey);
  const count = survey.response_count?.[0]?.count || 0;
  const fullLink = `${process.env.NEXT_PUBLIC_SITE_URL}/surveys/${slug}`;

  return (
    <Card className="mb-4 border-0 border-gray-200 shadow-none">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold leading-tight text-gray-800">
            {title}
          </h2>
          {
            isEnded
              ? (
                <span className="text-xs text-gray-700">종료된 설문</span>
              )
              : (
                <CopyLinkButton textToCopy={fullLink} />
              )
          }
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-700">진행 기간</div>
          <div className="text-right">2025.01.01 - 2025.01.26</div>

          <div className="text-gray-700">참가자</div>
          <div className="text-right font-medium">
            <span className="text-blue-500">{count}</span>
            {" "}
            명
          </div>

          {rewards.length > 0 && (
            <>
              <div className="mt-2 text-gray-700">등록한 가챠 상품</div>
              <div className="mt-2 text-right text-gray-700">남은 개수/총 개수</div>
              <ul className="col-span-2 space-y-2">
                {rewards.map(reward => (
                  <li
                    key={reward.reward_id}
                    className="flex items-center justify-between gap-2 border-b border-gray-100 py-1 last:border-0"
                  >
                    <div className="flex items-center text-gray-500">
                      <span className="text-sm">
                        -
                        {" "}
                        {reward.name}
                        {reward.name}
                        {reward.name}
                        {reward.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-primary">
                      {reward.remaining_stock ?? 0}
                      /
                      {reward.stock ?? 0}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
