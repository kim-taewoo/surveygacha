import Link from "next/link";

import Logo from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { SurveyMainInfo } from "./components/SurveyMainInfo";

type Params = Promise<{ id: string }>;

export default async function SurveyPage({ params }: { params: Params }) {
  const surveyId = (await params).id;
  const supabase = await getSupabaseServerClient();
  const { data: survey, error: surveyError } = await supabase
    .from("surveys")
    .select(`
      *,
      gacha_rewards(
        *,
        rewards(*)
      ),
      questionsCount:questions(count),
      responses(count)
    `)
    .eq("slug", surveyId)
    .single();

  console.log(survey, survey?.gacha_rewards?.[0]?.rewards);

  if (surveyError || !survey) {
    throw new Error("invalid survey");
  }

  type T = typeof survey.gacha_rewards;

  const participationCount = survey.responses?.[0]?.count;

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-50 pb-24">
      {/* 헤더 섹션 */}
      <header className="px-5 pb-[18px] pt-7">
        <Link className="inline-block" href="/">
          <Logo width={71} height={20} />
        </Link>
      </header>

      {/* 메인 컨텐츠 */}
      <SurveyMainInfo survey={survey} />

      {/* 말풍선 */}
      {!!participationCount && (
        <div className="fixed bottom-[88px]  px-5">
          <div className="relative inline-block">
            <div className="flex items-center gap-1 rounded-md bg-[#262626] px-3 py-2 text-[12px] text-white">
              현재
              <span>
                <span className="font-semibold">
                  {participationCount}
                  명
                </span>
                이 참여중  🔥
              </span>
            </div>
            {/* 말풍선 꼬리 */}
            <div className="absolute left-4 top-full size-0 border-x-4 border-t-8 border-x-transparent border-t-[#262626]" />
          </div>
        </div>
      )}

      {/* 시작하기 버튼 */}
      <div className="fixed bottom-0 mb-2 w-full max-w-md p-5">
        {/* TODO: 제대로 수정 */}
        <Link href={`/s/${surveyId}/r`}>
          <Button className="h-12 w-full gap-2 bg-[#0056EB] px-3 py-2 text-lg font-medium text-white hover:bg-blue-700">
            시작하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
