import { Button } from "@/components/ui/button";

import { QuestionCountsSlider } from "./QuestionCountsSlider";
import { SubjectInput } from "./SubjectInput";
import { TypeToggler } from "./TypeToggler";

interface Props {

}

export const GenerateInputs = ({}: Props) => {
  return (
    <form className="flex flex-col gap-5">
      <Button disabled className="h-12 w-full text-base disabled:opacity-80" variant="outline" size="lg">생성하기</Button>

      <SubjectInput />
      <TypeToggler />
      <QuestionCountsSlider />
    </form>
  );
};
