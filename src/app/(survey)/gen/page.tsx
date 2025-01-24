import { BackArrowHeader } from "@/components/layout/BackArrowHeader";
import { Button } from "@/components/ui/button";
import { GenerateInputs } from "@/features/gen/components/GenerateInputs";

interface Props {

}

const GenerateSurveyPage = ({}: Props) => {
  return (
    <>
      <BackArrowHeader title="AI로 설문조사 자동 생성" />
      <main className="flex w-full flex-col px-5">
        <GenerateInputs />
      </main>
    </>
  );
};

export default GenerateSurveyPage;
