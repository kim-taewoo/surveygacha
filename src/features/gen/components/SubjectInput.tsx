import { Input } from "@/components/ui/input";

import { ChatTextarea } from "./ChatTextarea";

interface Props {

}

export const SubjectInput = ({}: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white px-3 py-4">
      <h1 className="text-xl font-semibold leading-6">
        설문 주제
      </h1>
      <p>
        <span className="text-[#2563EB]">Tip.</span>
        어떤 정보를 수집하고자 하는지, 누구를 대상으로 하는지 명확하게 목적을 정의합니다.
      </p>
      <div>

        <ChatTextarea />
      </div>

    </div>
  );
};
