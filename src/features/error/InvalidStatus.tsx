import Link from "next/link";

import { InvalidePageIcon } from "@/assets/icons/invalid-page";

interface Props {
  title: string;
  description?: string;
}

export function InvalidStatus({
  title,
  description,
}: Props) {
  return (
    <div className="flex min-h-screen w-full max-w-md items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex items-center justify-center">
          <InvalidePageIcon />
        </div>
        <h1 className="mb-2 text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-gray-600">{description}</p>

        <Link
          href="/"
          className="mt-10 block text-primary"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
