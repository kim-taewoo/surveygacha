import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useSurvey } from "@/stores/useSurvey";

import { ChatTextarea } from "./ChatTextarea";

interface Props {

}

export const TypeToggler = ({}: Props) => {
  const questionTypes = useSurvey(state => state.genInputs.questionTypes);
  const setGenInput = useSurvey(state => state.setGenInput);

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-3 py-4">
      <h1 className="text-xl font-semibold leading-6">
        설문 유형
      </h1>
      <div className="flex flex-col gap-2 px-2 text-lg">
        <div className="flex justify-between">
          <span>하나 선택</span>
          <Switch
            checked={questionTypes.singleChoice}
            onCheckedChange={checked =>
              setGenInput("questionTypes", { ...questionTypes, singleChoice: checked })}
          />
        </div>
        <div className="flex justify-between">
          <span>다중 선택</span>
          <Switch
            checked={questionTypes.multipleChoice}
            onCheckedChange={checked =>
              setGenInput("questionTypes", { ...questionTypes, multipleChoice: checked })}
          />
        </div>
        <div className="flex justify-between">
          <span>리커트 척도</span>
          <Switch
            checked={questionTypes.likertScale}
            onCheckedChange={checked =>
              setGenInput("questionTypes", { ...questionTypes, likertScale: checked })}
          />
        </div>
        <div className="flex justify-between">
          <span>주관식</span>
          <Switch
            checked={questionTypes.openEndedLong}
            onCheckedChange={checked =>
              setGenInput("questionTypes", { ...questionTypes, openEndedLong: checked })}
          />
        </div>
      </div>
      <div>
      </div>

    </div>
  );
};
