import { CircleCheck } from "lucide-react";

export default function AlertError() {
  return (
    // To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element.
    <div className="z-[100] max-w-[400px] rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5">
      <div className="flex gap-2">
        <p className="grow text-sm">
          <CircleCheck
            className="-mt-0.5 me-3 inline-flex text-red-500"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          에러가 발생했습니다ㅠ
        </p>
      </div>
    </div>
  );
}
