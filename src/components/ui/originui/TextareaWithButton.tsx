"use client";

import { ArrowRight, SquarePen } from "lucide-react";

import { LoadingCircle } from "@/components/LoadingCircle";
import { ChatTextarea } from "@/features/survey/gen/components/ChatTextarea";

interface Props extends React.ComponentProps<"textarea"> {
  isLoading: boolean;
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
}

export const TextareaWithButton = ({ input, setInput, isLoading, onSubmit, ...props }: Props) => {
  return (
    <div className="relative rounded-lg">
      <ChatTextarea
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={onSubmit}
        className="pr-8"
        {...props}
      />
      <button
        onClick={onSubmit}
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Submit search"
        type="submit"
      >
        {isLoading
          ? (
            <LoadingCircle />
          )
          : (
            <SquarePen size={16} strokeWidth={2} aria-hidden="true" />
          )}
      </button>
    </div>
  );
};
