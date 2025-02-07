"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, CircleFadingPlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { Question, QuestionType } from "../../types";

type SortableOptionProps = {
  id: string;
  option: string;
  index: number;
  onOptionChange: (index: number, value: string) => void;
  onOptionRemove: (index: number) => void;
  canRemove: boolean;
};

// TODO: onOptionChange 를 디바운싱으로 동기화해야지 제대로 입력가능할 듯 하다. 아니면 다른 방법 생각
const SortableOption = ({ id, option, index, onOptionChange, onOptionRemove, canRemove }: SortableOptionProps) => {
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
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
};

interface Props {
  question: Question;
  onChange: (question: Question) => void;
}

const QuestionEditor = ({ question, onChange }: Props) => {
  const setQuestion = (newQuestion: Question) => {
    onChange(newQuestion);
  };

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

  const handleDragEnd = (event: DragEndEvent) => {
    if (!question.options) return;
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = question.options.findIndex(x => `option-${x}` === active.id);
      const newIndex = question.options.findIndex(x => `option-${x}` === over?.id);

      setQuestion({
        ...question,
        options: arrayMove(question.options, oldIndex, newIndex),
      });
    }
  };

  const handleTypeChange = (type: QuestionType) => {
    setQuestion({
      ...question,
      type,
      options: type === "likert_scale"
        ? ["매우 불만족", "불만족", "보통", "만족", "매우 만족"]
        : [],
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!question.options) return;
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const addOption = () => {
    if (!question.options) return;
    setQuestion({
      ...question,
      options: [...question.options, ""],
    });
  };

  const removeOption = (index: number) => {
    if (!question.options) return;
    const newOptions = question.options.filter((_, i) => i !== index);
    setQuestion({ ...question, options: newOptions });
  };

  return (
    <>
      {/* Question Type Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">질문 유형</label>
        {/* TODO: 유저가 작성한 옵션이 삭제되는 변경일시 경고하는 기능 추가 */}
        <RadioGroup value={question.type} onValueChange={handleTypeChange} className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single_choice" id={`${question.id}_single_choice`} />
            <Label className="text-base" htmlFor={`${question.id}_single_choice`}>단일 선택</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multiple_choice" id={`${question.id}_multiple_choice`} />
            <Label className="text-base" htmlFor={`${question.id}_multiple_choice`}>복수 선택</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="likert_scale" id={`${question.id}_likert_scale`} />
            <Label className="text-base" htmlFor={`${question.id}_likert_scale`}>리커트 척도</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="open_ended" id={`${question.id}_open_ended`} />
            <Label className="text-base" htmlFor={`${question.id}_open_ended`}>주관식</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">질문</label>
        <Textarea
          value={question.text}
          onChange={e => setQuestion({ ...question, text: e.target.value })}
          placeholder="질문을 입력하세요"
          className="flex-1"
          rows={1}
        />
      </div>

      {/* TODO: 이미지 추가 기능 넣기 */}

      {question.type !== "open_ended" && question.options && (

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
                    canRemove={question.type !== "likert_scale" && (question?.options ?? []).length > 1}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {question.type !== "likert_scale" && (
            <button
              onClick={addOption}
              className="flex w-full items-center justify-center gap-1 text-center text-base font-semibold text-primary hover:text-blue-700"
            >
              <CircleFadingPlus size={18} />
              <span>옵션 추가</span>
            </button>
          )}
        </div>
      )}

      {/* isRequired */}
      <div className="flex items-center gap-2">
        <Checkbox
          id={`${question.id}_isRequired`}
          checked={question.isRequired}
          onCheckedChange={checked => setQuestion({ ...question, isRequired: !!checked })}
        />
        <label htmlFor={`${question.id}_isRequired`} className="text-sm">필수 답변</label>
      </div>
    </>

  );
};

export default QuestionEditor;
