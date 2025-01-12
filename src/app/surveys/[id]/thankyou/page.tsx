import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-white p-4">
      <Card className="w-full max-w-md border-none bg-white/90 shadow-xl backdrop-blur">
        <CardContent className="p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold">설문에 참여해 주셔서 감사합니다!</h1>
          <p className="mb-6">귀하의 응답은 소중히 활용될 것입니다.</p>
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
