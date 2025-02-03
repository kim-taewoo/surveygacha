import { ArrowRight, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reward } from "@/types/supabase";

export const LinkContainer = ({ rewards }: { rewards: Reward[] }) => {
  const router = useRouter();

  const [linkId, setLinkId] = useState<string | null>(null);

  // 로컬스토리지에서 gachaLinkId 가져오기
  useEffect(() => {
    const storedLinkId = localStorage.getItem("gachaLinkId");
    if (storedLinkId) {
      // 쌍따옴표 제거하고 순수 ID 값만 저장
      const cleanId = storedLinkId.replace(/"/g, "");
      setLinkId(cleanId);
    }
    else {
      setLinkId(null); // 값이 없으면 null로 설정
    }
  }, []);

  const onCopyLinkClick = async () => {
    try {
      if (linkId) {
        const fullLink = `${process.env.NEXT_PUBLIC_BASIC_URL}/${linkId}`;
        await navigator.clipboard.writeText(fullLink);
        alert("링크가 복사되었습니다: " + fullLink);
      }
      else {
        alert("복사할 링크가 없습니다");
      }
    }
    catch (error) {
      console.error("링크 복사 에러:", error);
      alert("링크 복사 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between gap-7 p-6">
      <div className="flex flex-col items-center justify-center gap-7">
        <Image
          src="/icon/fileIcon.svg"
          alt="fileIcon"
          width={136}
          height={150}
        />
        <p className="text-center text-2xl font-semibold">
          생성이 완료되었습니다!
        </p>

        <div className="w-full">
          <div className="mb-2 flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-2">
            <p className="flex-1 truncate text-gray-600">
              {linkId ? `${linkId}` : "생성된 링크가 없습니다"}
            </p>
          </div>

          <Button
            onClick={onCopyLinkClick}
            className={cn("w-full mb-2")}
          >
            <Upload />
            {" "}
            링크 복사하기
          </Button>
          <Button
            onClick={() => linkId && router.push(`/${linkId}`)}
            className={cn("w-full border border-primary bg-white text-primary ")}
            disabled={!linkId}
          >
            <ArrowRight color="#0056EB" />
            {" "}
            링크로 이동하기
          </Button>
        </div>
      </div>

      <Link
        href="/"
        className="mt-auto text-sm text-primary"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};
