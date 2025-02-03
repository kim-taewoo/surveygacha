// 상품등록 및 확률 설정 페이지

import { BreadcrumbHeader } from "@/features/header";
import { RewardContainer } from "@/features/reward/components/rewardContainer";

const RewardPage = () => {
  return (
    <>
      <BreadcrumbHeader title="가챠 상품 등록" />
      <div className="flex w-full items-center justify-center">
        <RewardContainer />
      </div>
    </>

  );
};
export default RewardPage;
