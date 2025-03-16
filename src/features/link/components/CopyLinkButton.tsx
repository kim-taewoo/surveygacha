"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function CopyLinkButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  // Reset the copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast("링크가 복사되었습니다.");
    }
    catch (err) {
      console.error("Failed to copy text: ", err);
      toast("링크 복사 중 오류가 발생했습니다.");
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      className="h-8 border-blue-500 px-3 py-1 text-xs text-blue-500 hover:bg-blue-50"
    >
      링크 복사
    </Button>
  );
}
