"use client";

import React from "react";
import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import type {
  ChatRequestOptions,
} from "ai";

interface Props extends React.ComponentProps<"textarea"> {
  input: string;
  setInput: (value: string) => void;
  initialRows?: number;
  className?: string;
  isLoading?: boolean;
  handleSubmit?: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
}

export function ChatTextarea({ input, setInput, initialRows = 2, className, isLoading, handleSubmit, ...props }: Props) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = () => {
    handleSubmit?.();
  };

  return (
    <Textarea
      {...props}
      ref={textareaRef}
      value={input}
      onChange={handleInput}
      className={cn(
        "min-h-[24px] max-h-[calc(75dvh)] p-3 overflow-hidden resize-none rounded-lg !text-base bg-white focus-visible:ring-primary",
        className,
      )}
      rows={initialRows}
      autoFocus
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();

          if (isLoading) {
            toast.error("Please wait for the model to finish its response!");
          }
          else {
            submitForm();
          }
        }
      }}
    />
  );
}
