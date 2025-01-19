import { SurveyCard } from "@/features/surveyMypage/surveyCard";

// 참여한 설문조사 페이지
const ParticipatedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      {data.map((survey, index) => (
        <SurveyCard
          key={index}
          title={survey.title}
          startDate={survey.startDate}
          endDate={survey.endDate}
          rewardTitle={survey.rewardTitle}
          status={survey.status}
        />
      ))}
    </div>
  );
};
export default ParticipatedPage;

const data = [
  { title: "금융 생활 관련 설문", startDate: "2024-01-01T18:00:00.000", endDate: "2025-01-01T18:00:00.000", rewardTitle: "메가커피 아메리카노", status: false },
  { title: "일상 생활 관련 설문", startDate: "2024-02-01T18:00:00.000", endDate: "2025-02-01T18:00:00.000", rewardTitle: "스타벅스 아메리카노", status: true },
];
