"use client";

import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useSurvey } from "../../../stores/useSurvey";
import { QuestionType } from "../../../types";

import { TypeSelector } from "./TypeSelector";

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

      <TypeSelector question={question} onChange={handleTypeChange} />

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
