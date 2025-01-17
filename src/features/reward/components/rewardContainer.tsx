"use client";

import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Reward = {
  name: string;
  probability: string;
};

export const RewardContainer = () => {
  const router = useRouter();

  const [rewards, setRewards] = useState<Reward[]>([
    { name: "", probability: "" },
  ]);

  const [savedRewards, setSavedRewards] = useState<Reward[]>([]);

  useEffect(() => {
    const storedRewards = localStorage.getItem("savedRewards");
    if (storedRewards) {
      setSavedRewards(JSON.parse(storedRewards));
    }
  }, []);

  const addReward = () => {
    setRewards([...rewards, { name: "", probability: "" }]);
  };

  const removeReward = (index: number) => {
    setRewards(rewards.filter((_, i) => i !== index));
  };

  const updateReward = (index: number, field: keyof Reward, value: string) => {
    const newRewards = [...rewards];
    newRewards[index][field] = value;
    setRewards(newRewards);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("savedRewards", JSON.stringify(rewards));
    setSavedRewards(rewards);
    setRewards([{ name: "", probability: "" }]);
  };

  const totalProbability = rewards.reduce((sum, reward) => {
    const prob = parseFloat(reward.probability) || 0;
    return sum + prob;
  }, 0);

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>보상 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          {rewards.map((reward, index) => (
            <div key={index} className="mb-4 flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="보상명"
                  value={reward.name}
                  onChange={e => updateReward(index, "name", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  placeholder="확률 (%)"
                  value={reward.probability}
                  onChange={e =>
                    updateReward(index, "probability", e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full"
                />
              </div>
              {rewards.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeReward(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              )}
            </div>
          ))}

          <div className="mt-6 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={addReward}
              className="flex items-center gap-2"
            >
              <Plus className="size-4" />
              보상 추가
            </Button>
            <div className="text-sm">
              총 확률:
              {" "}
              {totalProbability.toFixed(1)}
              %
            </div>
          </div>

          <Button type="submit" className="mt-6 w-full">
            보상 등록
          </Button>
        </form>

        {/* 저장된 보상 목록 표시 */}
        <div className="mt-8">
          <h2 className="text-lg font-bold">저장된 보상</h2>
          {savedRewards.length === 0
            ? (
              <p className="text-sm text-gray-500">저장된 보상이 없습니다.</p>
            )
            : (
              <ul className="mt-4 space-y-2">
                {savedRewards.map((reward, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{reward.name}</span>
                    <span>
                      {reward.probability}
                      %
                    </span>
                  </li>
                ))}
              </ul>
            )}
        </div>
        <Button
          type="button"
          onClick={() => router.push("/admin/link")}
          className="mt-6 w-full "
        >
          다음
        </Button>
      </CardContent>
    </Card>
  );
};
