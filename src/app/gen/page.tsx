import { BackArrowHeader } from "@/components/layout/BackArrowHeader";
import { Button } from "@/components/ui/button";
import { GenerateInputs } from "@/features/gen/components/GenerateInputs";

interface Props {

}

const GenerateSurveyPage = ({}: Props) => {
  return (
    <>
      <BackArrowHeader title="AI로 설문조사 자동 생성" />
      <main className="flex w-full flex-col gap-5 px-5">
        <Button disabled className="h-12 w-full text-base" variant="outline" size="lg">생성하기</Button>
        <GenerateInputs />
      </main>
    </>
  );
};

export default GenerateSurveyPage;
