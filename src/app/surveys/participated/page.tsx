import Image from "next/image";

import { BreadcrumbHeader } from "@/features/header";
import { SurveyCard } from "@/features/surveyMypage/surveyCard";

// 참여한 설문조사 페이지
const ParticipatedPage = () => {
  return (
    <>
      <BreadcrumbHeader title="참여한 설문조사" />
      {
        data && data.length > 0
          ? (
            <div className="mx-auto flex w-full flex-col items-center justify-center px-4 pt-[70px]">
              {data.map((survey, index) => (
                <SurveyCard
                  key={`${index}_participatedCard`}
                  title={survey.title}
                  startDate={survey.startDate}
                  endDate={survey.endDate}
                  rewardTitle={survey.rewardTitle}
                  status={survey.status}
                />
              ))}
            </div>
          )
          : (
            <div className="flex h-screen w-screen items-center justify-center">
              <Image
                src="/assets/images/noSurveyData.svg"
                alt="설문조사 데이터 없음"
                width={375}
                height={250}
              />
            </div>
          )
      }
    </>
  );
};

export default ParticipatedPage;

const data = [
  { title: "금융 생활 관련 설문", startDate: "2024-01-01T18:00:00.000", endDate: "2025-01-01T18:00:00.000", rewardTitle: "메가커피 아메리카노", status: false },
  { title: "일상 생활 관련 설문", startDate: "2024-02-01T18:00:00.000", endDate: "2025-02-01T18:00:00.000", rewardTitle: "스타벅스 아메리카노", status: true },
];
