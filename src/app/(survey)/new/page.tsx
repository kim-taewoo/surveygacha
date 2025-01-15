import { BackButtonHeader } from "@/components/layout/BackButtonHeader";
import { SurveyTitleInput } from "@/features/survey/ai-generate/components/SurveyTitleInput";

const CreateNewAIPage = () => {
  return (
    <>
      <BackButtonHeader title="AI로 설문조사 자동 생성" />
      <div className="flex w-full flex-1 flex-col items-center justify-center px-5">
        <SurveyTitleInput />
      </div>
    </>
  );
};

export default CreateNewAIPage;
