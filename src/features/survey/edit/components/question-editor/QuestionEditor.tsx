"use client";

import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import { useSurvey } from "../../../stores/useSurvey";
import { QuestionType } from "../../../types";

import { SortableOptions } from "./SortableOptions";
import { TypeSelector } from "./TypeSelector";

interface Props {
  questionId: string;
}

const QuestionEditor = ({ questionId }: Props) => {
  const { question, updateQuestionText, updateQuestionOptions, updateQuestionType, toggleQuestionRequired } = useSurvey(useShallow(state => ({
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
  const [hasChanges, setHasChanges] = useState(false);

  // Sync local state with store when question changes
  useEffect(() => {
    if (question?.options) {
      setLocalOptions([...question.options]);
      setHasChanges(false);
    }
  }, [question?.id]);

  useEffect(() => {
    if (hasChanges) {
      const timer = setTimeout(() => {
        updateQuestionOptions(questionId, localOptions);
        setHasChanges(false);
      }, 1000 * 15); // 15 second debounce

      return () => clearTimeout(timer);
    }
  }, [localOptions, hasChanges, questionId, updateQuestionOptions]);

  // Update local state only (not the store)
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...localOptions];
    newOptions[index] = value;
    setLocalOptions(newOptions);
    setHasChanges(true);
  };

  const handleOptionsChange = (newOptions: string[]) => {
    setLocalOptions(newOptions);
    setHasChanges(true);
  };

  // Save changes immediately
  const handleSave = () => {
    updateQuestionOptions(questionId, localOptions);
    setHasChanges(false);
  };

  // Discard changes
  const handleCancel = () => {
    setLocalOptions([...(question?.options || [])]);
    setHasChanges(false);
  };

  if (!question) return null;

  // Add option to local state
  const handleAddOption = () => {
    const newOptions = [...localOptions, "새 옵션"];
    setLocalOptions(newOptions);
    setHasChanges(true);
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

        <SortableOptions options={localOptions} questionType={question.type} onOptionValueChange={handleOptionChange} onOptionsChange={handleOptionsChange} />

        {question.type !== "likert_scale" && (
          <button
            onClick={() => handleAddOption()}
            className="flex w-full items-center justify-center gap-2 text-center text-base font-medium text-primary hover:text-blue-700"
          >
            <CirclePlus strokeWidth={1.2} size={16} />
            <span className="text-sm">옵션 추가</span>
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
