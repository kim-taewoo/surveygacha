// 링크 생성 페이지
"use client";

import { useEffect, useState } from "react";

import { LinkContainer } from "@/features/link/components/linkContainer";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export interface Reward {
  survey_id: number;
  gacha_id: number;
  possibility: boolean;
}

const LinkPage = () => {
  const supabase = getSupabaseBrowserClient();

  const [rewards, setRewards] = useState<Reward[]>([]);

  const fetchRewards = async () => {
    try {
      const { data } = await supabase
        .from("rewards")
        .select("*");

      // data가 null일 수 있으므로 빈 배열을 기본값으로 설정
      setRewards(data as Reward[] || []);
    }
    catch (error) {
      console.error("reward 조회 에러:", error);
    }
  };

  // 컴포넌트 마운트 시 데이터 조회
  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <LinkContainer rewards={rewards} />
  );
};

export default LinkPage;
