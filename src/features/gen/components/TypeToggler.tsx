import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { ChatTextarea } from "./ChatTextarea";

interface Props {

}

export const TypeToggler = ({}: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-3 py-4">
      <h1 className="text-xl font-semibold leading-6">
        설문 유형
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span>객관식 질문</span>
          <Switch />
        </div>
        <div className="flex justify-between">
          <span>주관식 질문</span>
          <Switch />
        </div>
        <div className="flex justify-between">
          <span>다중 선택 질문</span>
          <Switch />
        </div>
      </div>
      <div>
      </div>

    </div>
  );
};
