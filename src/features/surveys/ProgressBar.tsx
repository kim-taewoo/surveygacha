// 진행 상태 바 컴포넌트

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-[14px] w-full bg-[#D1E2FF]">
      <div
        className="h-full bg-[#0056EB] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
