// 링크 생성 페이지
"use client";

import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface Reward {
  survey_id: number;
  gacha_id: number;
  possibility: boolean;
}

interface LinkPageProps {
  defaultId?: string;
}

const LinkPage = ({ defaultId = "survey" }: LinkPageProps) => {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [id, setId] = useState<string>(defaultId);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from("rewards")
        .select("*");

      // data가 null일 수 있으므로 빈 배열을 기본값으로 설정
      setRewards(data as Reward[] || []);
    }
    catch (error) {
      console.log("reward 조회 에러:", error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(id);
      alert("링크가 복사되었습니다");
    }
    catch (error) {
      console.log("링크 복사 에러:", error);
      alert("링크 복사 중 오류가 발생했습니다");
    }
  };

  // 컴포넌트 마운트 시 데이터 조회
  useEffect(() => {
    fetchRewards();
  }, []);

  const onClickLink = () => {
    // 이동 링크 수정하기
    router.push("/");
  };

  // // 데이터 추가 함수
  // const addReward = async (newReward) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("rewards")
  //       .insert([
  //         {
  //           survey_id: newReward.survey_id,
  //           gacha_id: newReward.gacha_id,
  //           possibility: newReward.possibility,
  //         },
  //       ])
  //       .select();

  //     if (error) throw error;

  //     // 데이터 추가 후 목록 새로고침
  //     fetchRewards();
  //   }
  //   catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 p-4">
          <p className="flex-1 truncate text-gray-600">
            {id || "생성된 링크가 없습니다"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="flex items-center gap-2"
          >
            <Copy className="size-4" />
            복사하기
          </Button>
        </div>

        <Button onClick={onClickLink} className="w-full">
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

export default LinkPage;
