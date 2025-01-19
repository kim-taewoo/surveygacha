// 다중 선택 질문 컴포넌트

import { OptionButton } from "./OptionButton";

interface MultipleSelectQuestionProps {
  id: number;
  options: string[];
  selectedAnswers: string[];
  onSelect: (id: number, option: string) => void;
  isSubmitting: boolean;
}

export function MultipleSelectQuestion({
  id,
  options,
  selectedAnswers,
  onSelect,
  isSubmitting,
}: MultipleSelectQuestionProps) {
  return (
    <div className="space-y-3">
      {options.map(option => (
        <OptionButton
          key={option}
          selected={selectedAnswers.includes(option)}
          onClick={() => onSelect(id, option)}
          isCheckbox
          disabled={isSubmitting}
        >
          {option}
        </OptionButton>
      ))}
    </div>
  );
}
