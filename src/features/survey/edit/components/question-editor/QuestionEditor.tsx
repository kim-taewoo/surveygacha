"use client";

import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { useSurvey } from "../../../stores/useSurvey";
import { Question, QuestionType } from "../../../types";

interface Props {
  questionId: string;
}

const QuestionEditor = ({ questionId }: Props) => {
  const { question, updateQuestionOption, updateQuestionText, addQuestionOption, updateQuestionOptions, updateQuestionType, removeQuestionOption, toggleQuestionRequired } = useSurvey(useShallow(state => ({
    question: state.questions.find(q => q.id === questionId),
    updateQuestionText: state.updateQuestionText,
    updateQuestionOption: state.updateQuestionOption,
    addQuestionOption: state.addQuestionOption,
    updateQuestionOptions: state.updateQuestionOptions,
    updateQuestionType: state.updateQuestionType,
    removeQuestionOption: state.removeQuestionOption,
    toggleQuestionRequired: state.toggleQuestionRequired,
  })));

  // Create local state for editing options
  const [localOptions, setLocalOptions] = useState<string[]>([]);

  // Sync local state with store when question changes
  useEffect(() => {
    if (question?.options) {
      setLocalOptions([...question.options]);
    }
  }, [question?.id]); // Only sync when the question ID changes

  if (!question) return null;

  // Update local state only (not the store)
  const handleOptionChange = (index, value) => {
    const newOptions = [...localOptions];
    newOptions[index] = value;
    setLocalOptions(newOptions);

    // Optionally debounce updates to the store
    // This requires a debounce function or useDebounce hook
    // updateQuestionOptions(question.id, newOptions);
  };

  // Add option to local state
  const handleAddOption = () => {
    const newOptions = [...localOptions, "새 옵션"];
    setLocalOptions(newOptions);
    updateQuestionOptions(question.id, newOptions);
  };

  const handleTypeChange = (type: QuestionType) => {
    updateQuestionType(question.id, type);
  };

  return (
    <>
      {/* Question Type Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium">질문 유형</label>
        {/* TODO: 유저가 작성한 옵션이 삭제되는 변경일시 경고하는 기능 추가 */}
        <RadioGroup value={question.type} onValueChange={handleTypeChange} className="mt-4 flex flex-wrap justify-between gap-3">
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

      {/* Question Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">질문</label>
        <Textarea
          value={question.text}
          onChange={e => updateQuestionText(question.id, e.target.value)}
          placeholder="질문을 입력하세요"
          className="flex-1"
          rows={1}
        />
      </div>

      {/* TODO: 이미지 추가 기능 넣기 */}

      <div className="space-y-4">
        <label className="block text-sm font-medium">답변 옵션</label>

        {localOptions.map((option, index) => (
          <Input
            key={index}
            type="text"
            value={option}
            onChange={e => handleOptionChange(index, e.target.value)}
            placeholder={`옵션 ${index + 1}`}
            className="flex-1"
          />
        ))}

        {question.type !== "likert_scale" && (
          <button
            onClick={() => handleAddOption()}
            className="flex w-full items-center justify-center gap-1 text-center text-base font-semibold text-primary hover:text-blue-700"
          >
            <CircleFadingPlus size={18} />
            <span>옵션 추가</span>
          </button>
        )}
      </div>

      {/* isRequired */}
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${question.id}_isRequired`}
          checked={question.isRequired}
          onCheckedChange={checked => toggleQuestionRequired(question.id)}
        />
        <label htmlFor={`${question.id}_isRequired`} className="text-sm">필수 답변</label>
      </div>
    </>

  );
};

export default QuestionEditor;
