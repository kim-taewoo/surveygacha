import { BackArrowHeader } from "@/components/layout/BackArrowHeader";
import { InvalidStatus } from "@/features/error/InvalidStatus";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { ParticipatedSurveyCard } from "../components/ParticipatedSurveyCard";

const ParticipatedSurveyPage = async () => {
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

  const { data: responses, error } = await supabase.from("responses")
    .select(`
      *,
      surveys(*, rewards(*, user_rewards(*)))
      `,
    ).eq("user_id", user.id).eq("surveys.rewards.user_rewards.user_id", user.id).order("ended_at", { ascending: false });

  if (!responses?.length || error) {
    return (
      <InvalidStatus title="아직 참여한 설문조사가 없어요!" />
    );
  }

  const surveys = responses.map(response => response.surveys);

  return (
    <div className="pb-16">
      <BackArrowHeader
        title="참여한 설문조사"
      />
      <main className="px-5">

        {/* Survey Cards */}
        {surveys.map(survey => (
          <ParticipatedSurveyCard key={survey.survey_id} survey={survey} />
        ))}
      </main>
    </div>
  );
};

export default ParticipatedSurveyPage;
