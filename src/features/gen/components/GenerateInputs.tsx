"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { handleSubmit } from "../actions";

import { QuestionCountsSlider } from "./QuestionCountsSlider";
import { SubjectInput } from "./SubjectInput";
import { TypeToggler } from "./TypeToggler";

interface Props {

}

export const GenerateInputs = ({}: Props) => {
  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <Button type="submit" className="h-12 w-full text-base disabled:opacity-80" size="lg">생성하기</Button>

      <SubjectInput />

      <div className="relative flex items-center justify-between gap-3">
        <Separator className="shrink" />
        <div className="shrink-0 grow text-sm opacity-70">세부설정</div>
        <Separator className="shrink" />
      </div>
      <TypeToggler />
      <QuestionCountsSlider />
    </form>
  );
};
