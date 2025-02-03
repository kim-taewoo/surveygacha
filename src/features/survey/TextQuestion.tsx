// 주관식 질문 컴포넌트

interface TextQuestionProps {
  id: number;
  answer: string;
  onAnswer: (id: number, text: string) => void;
  isSubmitting: boolean;
}

export function TextQuestion({
  id,
  answer,
  onAnswer,
  isSubmitting,
}: TextQuestionProps) {
  return (
    <div className="w-full rounded-lg border-0 bg-[#F5F5F5] p-4">
      <textarea
        placeholder="답변을 입력해주세요."
        value={answer}
        onChange={e => onAnswer(id, e.target.value)}
        className="min-h-[112px] w-full resize-none border-0 bg-transparent p-0 text-base outline-none"
        disabled={isSubmitting}
      />
    </div>
  );
}
