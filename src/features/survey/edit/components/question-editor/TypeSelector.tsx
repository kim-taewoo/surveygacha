import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question, QuestionType } from "@/features/survey/types";

interface Props {
  question: Question;
  onChange: (type: QuestionType) => void;
}

export function TypeSelector({ question, onChange }: Props) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">질문 유형</label>
      {/* TODO: 유저가 작성한 옵션이 삭제되는 변경일시 경고하는 기능 추가 */}
      <RadioGroup value={question.type} onValueChange={onChange} className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem className="border-[#D1D5DB]" value="single_choice" id={`${question.id}_single_choice`} />
          <Label className="text-xs font-normal" htmlFor={`${question.id}_single_choice`}>단일 선택</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem className="border-[#D1D5DB]" value="multiple_choice" id={`${question.id}_multiple_choice`} />
          <Label className="text-xs font-normal" htmlFor={`${question.id}_multiple_choice`}>복수 선택</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem className="border-[#D1D5DB]" value="likert_scale" id={`${question.id}_likert_scale`} />
          <Label className="text-xs font-normal" htmlFor={`${question.id}_likert_scale`}>리커트 척도</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem className="border-[#D1D5DB]" value="open_ended" id={`${question.id}_open_ended`} />
          <Label className="text-xs font-normal" htmlFor={`${question.id}_open_ended`}>주관식</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
