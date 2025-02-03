// 단일 선택 질문 컴포넌트
import { OptionButton } from "./OptionButton";

interface MultipleChoiceQuestionProps {
  id: number;
  options: string[];
  selectedAnswer: string | undefined;
  onSelect: (id: number, option: string) => void;
  isSubmitting: boolean;
}

export function MultipleChoiceQuestion({
  id,
  options,
  selectedAnswer,
  onSelect,
  isSubmitting,
}: MultipleChoiceQuestionProps) {
  return (
    <div className="space-y-3">
      {options.map(option => (
        <OptionButton
          key={option}
          selected={selectedAnswer === option}
          onClick={() => onSelect(id, option)}
          disabled={isSubmitting}
        >
          {option}
        </OptionButton>
      ))}
    </div>
  );
}
