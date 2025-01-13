"use client";

import { useChat } from "ai/react";
import { ArrowRight } from "lucide-react";

import { LoadingCircle } from "@/components/LoadingCircle";
import { ChatTextarea } from "@/features/survey/ai-generate/components/ChatTextarea";

import { Textarea } from "../textarea";

interface Props extends React.ComponentProps<"textarea"> {
  id: string;
}

export const TextareaWithButton = ({ id, ...props }: Props) => {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    experimental_throttle: 100,
    onFinish: (message, options) => {
      console.log(message, options);
    },
  });

  return (
    <div className="relative">
      {/* <Textarea className="peer bg-white pe-9" {...props} /> */}
      <ChatTextarea
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Submit search"
        type="submit"
      >
        {/* <ArrowRight size={16} strokeWidth={2} aria-hidden="true" /> */}
        <LoadingCircle />
      </button>
    </div>
  );
};
