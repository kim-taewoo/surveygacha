// 질문 헤더 컴포넌트

interface QuestionHeaderProps {
  question: string;
}

export function QuestionHeader({ question }: QuestionHeaderProps) {
  return (
    <>
      <p className="text-sm text-gray-600">* 필수 입력</p>
      <h3 className="mb-6 text-lg font-normal">{question}</h3>
    </>
  );
}
