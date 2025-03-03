import { Switch } from "@/components/ui/switch";
import { useSurvey } from "@/features/survey/stores/useSurvey";

interface Props {

}

export const TypeToggler = ({}: Props) => {
  const questionTypes = useSurvey(state => state.genInputs.question_types);
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
            checked={questionTypes.single_choice}
            onCheckedChange={checked =>
              setGenInput("question_types", { ...questionTypes, single_choice: checked })}
          />
        </div>
        <div className="flex justify-between">
          <span>다중 선택</span>
          <Switch
            checked={questionTypes.multiple_choice}
            onCheckedChange={checked =>
              setGenInput("question_types", { ...questionTypes, multiple_choice: checked })}
          />
        </div>
        <div className="flex justify-between">
          <span>리커트 척도</span>
          <Switch
            checked={questionTypes.likert_scale}
            onCheckedChange={checked =>
              setGenInput("question_types", { ...questionTypes, likert_scale: checked })}
          />
        </div>
        <div className="flex justify-between">
          <span>주관식</span>
          <Switch
            checked={questionTypes.open_ended}
            onCheckedChange={checked =>
              setGenInput("question_types", { ...questionTypes, open_ended: checked })}
          />
        </div>
      </div>
      <div>
      </div>

    </div>
  );
};
