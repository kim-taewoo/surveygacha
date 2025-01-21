"use client";

import Image from "next/image";
import React, { useState } from "react";

import { GachaMachineR3F } from "@/components/gacha/GachaMachineR3F";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function GachaPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="size-full h-screen min-h-dvh">
      <GachaMachineR3F />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>가챠 결과</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6">
            <div>
              <Image
                src="/images/sparkler.png"
                alt="sparkler"
                width={100}
                height={100}
              />
            </div>
            <div className="text-center">
              <div className="mb-4 text-2xl font-semibold">
                <div>축하합니다 !</div>
                <div>상품에 당첨되었습니다</div>
              </div>
              <div>상품 수령을 위해 로그인을 진행해 주세요</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
