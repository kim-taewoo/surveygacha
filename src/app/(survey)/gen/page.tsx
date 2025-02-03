import { BackArrowHeader } from "@/components/layout/BackArrowHeader";
import { GenerateInputs } from "@/features/survey/gen/components/GenerateInputs";

interface Props {

}

const GenerateSurveyPage = ({}: Props) => {
  return (
    <div className="pb-16">
      <BackArrowHeader title="AI로 설문조사 자동 생성" />
      <main className="flex w-full flex-col px-5">
        <GenerateInputs />
      </main>
    </div>
  );
};

export default GenerateSurveyPage;
