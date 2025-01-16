import { ArrowRight, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Reward } from "@/app/new/link/page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const defaultId = "survey";

export const LinkContainer = ({ rewards }: { rewards: Reward[] }) => {
  const router = useRouter();

  const linkId = defaultId;

  const onCopyLinkClick = async () => {
    try {
      await navigator.clipboard.writeText(linkId);
      alert("링크가 복사되었습니다");
    }
    catch (error) {
      console.error("링크 복사 에러:", error);
      alert("링크 복사 중 오류가 발생했습니다");
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6">
      <Image
        src="/icon/fileIcon.svg"
        alt="fileIcon"
        width={136}
        height={150}
      />
      <p className="text-center text-lg font-semibold text-gray-800">
        생성이 완료되었습니다!
      </p>

      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <div className="mb-2 flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-2">
          <p className="flex-1 truncate text-gray-600">
            {linkId || "생성된 링크가 없습니다"}
          </p>
        </div>

        <Button
          onClick={onCopyLinkClick}
          className={cn("w-full hover:bg-primary/70 mb-2 ")}
        >
          <Upload />
          {" "}
          링크 복사하기
        </Button>
        <Button
          onClick={() => router.push("/")}
          className={cn("w-full border border-primary bg-white text-primary hover:bg-primary-foreground/70 ")}
        >
          <ArrowRight color="#0056EB" />
          {" "}
          링크로 이동하기
        </Button>

      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-4 text-sm text-primary underline"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};
