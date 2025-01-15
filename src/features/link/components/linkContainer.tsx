import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";

import { Reward } from "@/app/new/link/page";
import { Button } from "@/components/ui/button";

const defaultId = "survey";

export const LinkContainer = ({ rewards }: { rewards: Reward[] }) => {
  const router = useRouter();

  const linkId = defaultId;

  const onCopyLinkClick = async () => {
    try {
      await navigator.clipboard.writeText(linkId);
      alert("링크가 복사되었습니다");
    }
    catch (error) {
      console.error("링크 복사 에러:", error);
      alert("링크 복사 중 오류가 발생했습니다");
    }
  };
  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 p-4">
          <p className="flex-1 truncate text-gray-600">
            {linkId || "생성된 링크가 없습니다"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onCopyLinkClick}
            className="flex items-center gap-2"
          >
            <Copy className="size-4" />
            복사하기
          </Button>
        </div>

        <Button
          onClick={() => {
          // 이동 링크 수정하기
            router.push("/");
          }}
          className="w-full"
        >
          생성된 링크로 이동하기
        </Button>

        {/* 데이터 목록 표시 */}
        <ul>
          {rewards.map(reward => (
            <li key={`${reward.survey_id}-${reward.gacha_id}`}>
              Survey ID:
              {" "}
              {reward.survey_id}
              ,
              Gacha ID:
              {" "}
              {reward.gacha_id}
              ,
              Possibility:
              {" "}
              {reward.possibility ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
