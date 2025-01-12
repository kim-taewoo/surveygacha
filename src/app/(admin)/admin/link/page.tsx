// 링크 생성 페이지
"use client";

import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface LinkPageProps {
  defaultId?: string;
}

const LinkPage = ({ defaultId = "survey" }: LinkPageProps) => {
  const router = useRouter();
  const [id, setId] = useState(defaultId);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(id);
      alert("링크가 복사되었습니다");
    }
    catch (error) {
      alert("링크 복사 중 오류가 발생했습니다");
    }
  };

  const onClickLink = () => {
    // 이동 링크 수정하기
    router.push("/");
  };

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 p-4">
          <p className="flex-1 truncate text-gray-600">
            {id || "생성된 링크가 없습니다"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="flex items-center gap-2"
          >
            <Copy className="size-4" />
            복사하기
          </Button>
        </div>

        <Button onClick={onClickLink} className="w-full">
          생성된 링크로 이동하기
        </Button>
      </div>
    </div>
  );
};

export default LinkPage;
