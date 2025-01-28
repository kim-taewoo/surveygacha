"use client";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  maxTicks?: number;
  tickLabelSkipInterval?: number;
  errorMessage?: string;
}

export function SliderWithTicks({ value, onChange, maxTicks = 15, tickLabelSkipInterval = 2, errorMessage }: Props) {
  const ticks = [...Array(maxTicks + 1)].map((_, i) => i);

  function handleValueChange(value: number[]) {
    onChange(value[0]);
  }

  return (
    <div className="space-y-4">
      <div className="text-right ">
        <output name="result" htmlFor="slider-ticks" className={cn("text-sm", errorMessage ? "text-destructive" : "")}>
          {errorMessage || (
            <span>
              최소
              {" "}
              <span className="font-semibold text-primary">{value}</span>
              개의 문항을 생성합니다.
            </span>
          )}
        </output>
      </div>
      <div>
        <Slider name="slider1" id="slider-ticks" onValueChange={handleValueChange} value={[value]} max={maxTicks} aria-label="Slider with ticks" />
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
