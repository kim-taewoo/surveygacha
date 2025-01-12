"use client"

import React from "react"
import { toast } from "sonner"

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import type {
  ChatRequestOptions,
} from "ai"

interface Props {
  input: string
  setInput: (value: string) => void
  className?: string
  isLoading: boolean
  handleSubmit: (
    event?: {
      preventDefault?: () => void
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void
}

export function ChatTextarea({ input, setInput, className, isLoading, handleSubmit }: Props) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
    adjustHeight()
  }

  const submitForm = () => {
    handleSubmit()
    setInput("")
  }

  return (
    <Textarea
      ref={textareaRef}
      placeholder="Send a message..."
      value={input}
      onChange={handleInput}
      className={cn(
        "min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700",
        className,
      )}
      rows={2}
      autoFocus
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault()

          if (isLoading) {
            toast.error("Please wait for the model to finish its response!")
          }
          else {
            submitForm()
          }
        }
      }}
    />
  )
}
