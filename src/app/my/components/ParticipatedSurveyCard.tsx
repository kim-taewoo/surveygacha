import { Card, CardContent } from "@/components/ui/card";
import CopyLinkButton from "@/features/link/components/CopyLinkButton";
import { Reward, Survey, UserReward } from "@/types";

interface Props {
  survey: Survey & {
    rewards: (Reward & {
      user_rewards: UserReward[];
    })[];
  };
}

export async function ParticipatedSurveyCard({ survey }: Props) {
  const { title, end_date, slug, rewards } = survey;

  const isEnded = end_date && new Date(end_date) < new Date();

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

          {rewards.length > 0 && (
            <>
              <div className="mt-2 text-gray-700">보상 품목</div>
              <div className="mt-2 text-right text-gray-700">당첨 여부</div>
              <ul className="col-span-2 space-y-2">
                {rewards.map(reward => (
                  <li
                    key={reward.reward_id}
                    className="flex items-center justify-between gap-2 border-b border-gray-100 py-1 last:border-0"
                  >
                    <div className="flex items-center ps-1 text-gray-500">
                      <span className="text-sm">{reward.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-primary">
                      {reward.user_rewards.length > 0
                        ? (
                          <span className="text-sm font-semibold">당첨</span>
                        )
                        : (
                          <span className="text-sm font-semibold text-red-600">꽝</span>
                        )}
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
