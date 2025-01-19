"use client";

import { ImageIcon, Plus, Trash2 } from "lucide-react";
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
    <div className="size-full min-w-[375px] overflow-y-auto">

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
              <div className="flex flex-col space-y-2">
                <Input
                  placeholder="상품명"
                  value={reward.name}
                  onChange={e => updateReward(index, "name", e.target.value)}
                  className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-24 items-center justify-center border-gray-200 text-sm">
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
                    <span className="text-sm">첨부 이미지</span>
                    <span className="text-sm text-gray-400">(선택)</span>
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
                      className="absolute flex items-center gap-2 rounded-md border border-blue-500 px-3 py-2 text-sm text-blue-500 hover:bg-blue-50"
                    >
                      <ImageIcon className="size-4" />
                      {" "}
                      추가
                    </label>
                  </div>
                </div>
                {
                  rewards.length > 1 && index !== 0 && (
                    <Button
                      type="button"
                      onClick={() => removeReward(index)}
                    >
                      <Trash2 />
                      삭제
                    </Button>
                  )
                }

                {reward.image && (
                  <div className="flex w-[375px] flex-col items-center rounded">
                    <Image
                      src={URL.createObjectURL(reward.image)}
                      alt="미리보기"
                      width={375}
                      height={200}
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => updateReward(index, "image", null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </form>

      <div className="flex w-full justify-center">
        <Button type="button" onClick={addReward} variant="outline">
          상품 추가하기
          {" "}
          <Plus />
        </Button>

      </div>

    </div>
  );
};
