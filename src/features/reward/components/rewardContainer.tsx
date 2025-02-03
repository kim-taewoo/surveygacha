"use client";

import { ImageIcon, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Reward = {
  name: string;
  probability: string;
  image?: File | null;
};

type RewardField = {
  name: string;
  probability: string;
  image: File | null;
};

export const RewardContainer = () => {
  const router = useRouter();

  const [rewards, setRewards] = useState<Reward[]>([
    { name: "", probability: "", image: null },
  ]);

  const [savedRewards, setSavedRewards] = useState<Reward[]>([]);
  const gachaLinkId = uuid();

  useEffect(() => {
    const storedRewards = localStorage.getItem("savedRewards");
    if (storedRewards) {
      setSavedRewards(JSON.parse(storedRewards));
    }
  }, []);

  const addReward = () => {
    setRewards([...rewards, { name: "", probability: "", image: null }]);
  };

  const removeReward = (index: number) => {
    setRewards(rewards.filter((_, i) => i !== index));
    const updatedRewards = savedRewards.filter((_, i) => i !== index);
    setSavedRewards(updatedRewards);

    // localStorage 업데이트
    localStorage.setItem("savedRewards", JSON.stringify(updatedRewards));
  };

  const updateReward = (
    index: number,
    field: keyof RewardField,
    value: string | File | null,
  ) => {
    const newRewards = [...rewards];
    if (field === "image") {
      newRewards[index] = { ...newRewards[index], image: value as File | null };
    }
    else {
      newRewards[index] = { ...newRewards[index], [field]: value as string };
    }
    setRewards(newRewards);
  };

  // file 데이터 직렬화
  const prepareRewardsForStorage = (rewards: Reward[]) => {
    return rewards.map(reward => ({
      ...reward,
      image: reward.image ? URL.createObjectURL(reward.image) : null,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rewardsToStore = prepareRewardsForStorage(rewards);
    localStorage.setItem("savedRewards", JSON.stringify(rewardsToStore));
    localStorage.setItem("gachaLinkId", JSON.stringify(gachaLinkId));

    setSavedRewards(rewards);
    setRewards([{ name: "", probability: "", image: null }]);
    router.push("/new/link");
  };

  const isDisabled = rewards.some(
    reward =>
      reward.name.trim() === ""
      || reward.probability.trim() === ""
      || isNaN(Number(reward.probability)),
  );

  return (
    <div className="size-full overflow-y-auto p-6 pt-[70px]">
      <form onSubmit={onSubmit}>
        <Button
          type="submit"
          className="mb-4 w-full"
          variant={savedRewards.length > 0 ? "default" : "outline"}
          disabled={isDisabled}
        >
          {savedRewards.length > 0 ? "발행 완료" : "발행하기"}
        </Button>

        {rewards.map((reward, index) => (
          <Card key={index} className="mb-4 shadow-lg">
            <CardContent className="space-y-4 p-6">
              {/* 게시글 삭제 */}
              {
                rewards.length > 1 && index !== 0 && (
                  <div
                    className="flex justify-end"
                  >
                    <X size={14} onClick={() => removeReward(index)} className="cursor-pointer" />
                  </div>
                )
              }

              <div className="flex flex-col space-y-2">
                <Input
                  placeholder="상품명"
                  value={reward.name}
                  onChange={e => updateReward(index, "name", e.target.value)}
                  className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center border-gray-200 text-sm font-semibold">
                    당첨 확률
                  </span>
                  <Input
                    type="number"
                    placeholder="확률 (%)"
                    value={reward.probability}
                    onChange={e => updateReward(index, "probability", e.target.value)}
                    min="0"
                    max="100"
                    step="1"
                    className="flex-1 rounded-md border border-gray-300"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">첨부 이미지</span>
                    <span className="text-sm text-[#6B7280]">(선택)</span>
                  </div>
                  <div className="relative flex cursor-pointer items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        updateReward(index, "image", file);
                      }}
                      className="absolute inset-0 opacity-0"
                      id={`file-upload-${index}`}
                      style={{ width: "1px", height: "1px" }}
                    />
                    <label
                      htmlFor={`file-upload-${index}`}
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-[#0056EB] px-2 py-1.5 text-sm font-medium text-[#0056EB] hover:bg-blue-50"
                    >
                      <ImageIcon className="size-4" />
                      {" "}
                      {reward.image ? "변경" : "추가"}
                    </label>
                  </div>
                </div>

                {reward.image && (
                  <div className="relative h-[200px] w-[375px] overflow-auto rounded bg-gray-100">
                    {/* 이미지 삭제 */}
                    <div
                      onClick={() => updateReward(index, "image", null)}
                      className="absolute right-2 top-2 cursor-pointer rounded-full bg-black p-0.5"

                    >
                      <X size={12} color="white" />
                    </div>
                    <Image
                      src={URL.createObjectURL(reward.image)}
                      alt="미리보기"
                      width={375}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </form>

      <div className="flex w-full justify-center">
        <Button type="button" onClick={addReward} variant="outline" className="text-[#0056EB]">
          상품 추가하기
          {" "}
          <Plus />
        </Button>

      </div>

    </div>
  );
};
