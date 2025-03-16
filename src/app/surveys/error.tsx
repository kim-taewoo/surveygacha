"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { InvalidStatus } from "@/features/error/InvalidStatus";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    // Try reset the page
    // reset()
  }, [error]);

  return (
    <InvalidStatus title="유효하지 않은 폼입니다" description="이미 끝난 설문이거나 응답이 마감되었습니다." />
  );
}
