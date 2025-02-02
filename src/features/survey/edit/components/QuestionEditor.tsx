"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { Question } from "../../types";

const SortableOption = ({ id, option, index, onOptionChange, onOptionRemove, canRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 ${isDragging ? "bg-gray-50 opacity-50" : ""}`}
    >
      <div {...attributes} {...listeners}>
        <GripVertical className="size-5 cursor-move touch-none text-gray-400" />
      </div>
      <Input
        type="text"
        value={option}
        onChange={e => onOptionChange(index, e.target.value)}
        placeholder={`옵션 ${index + 1}`}
        className="flex-1"
      />
      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOptionRemove(index)}
          className="text-red-500 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="size-4" />
        </Button>
      )}
    </div>
  );
};

interface Props {
  initialQuestion: Question;
  // onChange: (question: Question) => void;
}

const QuestionEditor = ({ initialQuestion, onChange }: Props) => {
  const [question, setQuestion] = useState({ ...initialQuestion, options: [...initialQuestion.options || []] });
  // Configure sensors with custom touch handling
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = question.options.findIndex(x => `option-${x}` === active.id);
      const newIndex = question.options.findIndex(x => `option-${x}` === over.id);

      setQuestion(prev => ({
        ...prev,
        options: arrayMove(prev.options, oldIndex, newIndex),
      }));
    }
  };

  const handleTypeChange = (type) => {
    setQuestion(prev => ({
      ...prev,
      type,
      options: type === "likert_scale"
        ? ["매우 불만족", "불만족", "보통", "만족", "매우 만족"]
        : [],
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setQuestion(prev => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const removeOption = (index) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    setQuestion(prev => ({ ...prev, options: newOptions }));
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 rounded-lg bg-white p-5 shadow">
      {/* Question Type Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">질문 유형</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={question.type === "single_choice"}
              onChange={() => handleTypeChange("single_choice")}
              className="mr-2"
            />
            <span>단일 선택</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={question.type === "multiple_choice"}
              onChange={() => handleTypeChange("multiple_choice")}
              className="mr-2"
            />
            <span>복수 선택</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={question.type === "likert_scale"}
              onChange={() => handleTypeChange("likert_scale")}
              className="mr-2"
            />
            <span>리커트 척도</span>
          </label>
        </div>
      </div>

      {/* Question Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">질문</label>
        <Input
          type="text"
          value={question.text}
          onChange={e => setQuestion(prev => ({ ...prev, text: e.target.value }))}
          placeholder="질문을 입력하세요"
          className="flex-1"
        />
      </div>

      {/* Options */}
      <div className="space-y-4">
        <label className="block text-sm font-medium">답변 옵션</label>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={question.options.map(option => `option-${option}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <SortableOption
                  key={`option-${option}`}
                  id={`option-${option}`}
                  option={option}
                  index={index}
                  onOptionChange={handleOptionChange}
                  onOptionRemove={removeOption}
                  canRemove={question.type !== "likert_scale" && question.options.length > 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {question.type !== "likert_scale" && (
          <button
            onClick={addOption}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
          >
            <Plus size={20} />
            <span>옵션 추가</span>
          </button>
        )}
      </div>

      {/* isRequired */}
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${question.id}_isRequired`}
          checked={question.isRequired}
          onCheckedChange={checked => setQuestion(prev => (
            { ...prev, isRequired: !!checked }
          ))}
        />
        <label htmlFor={`${question.id}_isRequired`} className="text-sm">필수 답변</label>
      </div>
    </div>

  );
};

export default QuestionEditor;
