// 선택지 버튼 컴포넌트

import { Check } from "lucide-react";

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isCheckbox?: boolean;
  disabled?: boolean;
}

export function OptionButton({
  selected,
  onClick,
  children,
  isCheckbox,
  disabled,
}: OptionButtonProps) {
  const buttonClasses = `
    flex h-[52px] w-full items-center justify-between rounded-lg px-4 mb-3
    ${selected
      ? `border ${isCheckbox ? "border-[#0056EB]" : "border-[#0056EB]"} bg-[#F0F4FF]`
      : "bg-[#F5F5F5] hover:bg-[#F0F4FF]"}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      <span className="text-base text-[#262626]">{children}</span>
      <div className={`
        flex size-5 items-center justify-center border-2
        ${isCheckbox ? "rounded-md" : "rounded-full"}
        ${selected
      ? "border-[#0056EB] bg-[#0056EB]"
      : "border-gray-300 bg-white"}
      `}
      >
        {selected && <Check className="size-3 text-white" />}
      </div>
    </button>
  );
}
