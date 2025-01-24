import { Input } from "@/components/ui/input";
import { SliderWithTicks } from "@/components/ui/originui/SliderWithTicks";

import { ChatTextarea } from "./ChatTextarea";

interface Props {

}

export const QuestionCountsSlider = ({}: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-3 py-4">
      <h1 className="text-xl font-semibold leading-6">
        설문 개수
      </h1>
      <p className="flex gap-1">
        <span className="text-[#2563EB]">Tip.</span>
        응답자의 집중력을 고려하여 질문 수를 조절합니다.
      </p>
      <div>
        <SliderWithTicks />
      </div>

    </div>
  );
};
