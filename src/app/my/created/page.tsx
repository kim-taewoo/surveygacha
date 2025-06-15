import React from "react";

import { BackArrowHeader } from "@/components/layout/BackArrowHeader";
import { InvalidStatus } from "@/features/error/InvalidStatus";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { CreatedSurveyCard } from "../components/CreatedSurveyCard";

const CreatedSurveyPage = async () => {
  const supabase = await getSupabaseServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user?.id || sessionError) {
    return (
      <InvalidStatus title="아직 진행하고 있는 설문조사가 없어요!" />
    );
  }

  const { data: surveys, error } = await supabase.from("surveys").select(`
    *,
    response_count:responses(count),
    rewards:rewards(*)
    `,
  ).eq("created_by", user.id).order("created_at", { ascending: false });

  if (!surveys?.length || error) {
    return (
      <InvalidStatus title="아직 진행하고 있는 설문조사가 없어요!" />
    );
  }

  return (
    <div className="pb-16">
      <BackArrowHeader
        title="진행한 설문조사"
      />
      <main className="px-5">

        {/* Survey Cards */}
        {surveys.map(survey => (
          <CreatedSurveyCard key={survey.survey_id} survey={survey} />
        ))}
      </main>
    </div>
  );
};

export default CreatedSurveyPage;
