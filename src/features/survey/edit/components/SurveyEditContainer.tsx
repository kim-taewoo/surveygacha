"use client";

import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useSurvey } from "@/features/survey/stores/useSurvey";

import { SurveyTitleAndDescription } from "./SurveyTitleAndDescription";

const SurveyQuestions = dynamic(() => import("./SurveyQuestions").then(mod => mod.SurveyQuestions), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export function SurveyEditContainer() {
  const router = useRouter();
  const addQuestion = useSurvey(state => state.addQuestion);

  return (
    <main className="flex flex-col gap-5 px-5 pb-16">
      <Button onClick={() => router.push("/rewards")} className="h-12 w-full text-base" size="lg">
        작성 완료
      </Button>
      <SurveyTitleAndDescription />
      <SurveyQuestions />
      {/* 질문 추가 버튼 */}
      <div className="flex justify-center">
        <Button
          className="h-12 border-primary text-base text-primary"
          variant="outline"
          size="lg"
          onClick={() => addQuestion("single_choice")}
        >
          <Plus className="text-primary" size={20} />
          {" "}
          <span className="text-primary">
            질문 추가하기
          </span>
        </Button>
      </div>
    </main>
  );
}
