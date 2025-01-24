"use client";

import { FormEvent, FormEventHandler } from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface Props {
  minTicks?: number;
  maxTicks?: number;
  tickLabelSkipInterval?: number;
}

export function SliderWithTicks({ minTicks = 5, maxTicks = 15, tickLabelSkipInterval = 2 }: Props) {
  const ticks = [...Array(maxTicks + 1)].map((_, i) => i);

  const handleChange: FormEventHandler<HTMLDivElement> = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="space-y-4">
      <Label>설문 개수</Label>
      <div>
        <Slider onChange={handleChange} defaultValue={[5]} max={maxTicks} aria-label="Slider with ticks" />
        <span
          className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          {ticks.map((_, i) => (
            <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
              <span
                className={cn("h-1 w-px bg-muted-foreground/70", i % tickLabelSkipInterval !== 0 && "h-0.5")}
              />
              <span className={cn(i % tickLabelSkipInterval !== 0 && "opacity-0")}>{i}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
