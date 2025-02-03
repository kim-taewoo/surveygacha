// 상품등록 및 확률 설정 페이지

import { BackArrowHeader } from "@/components/layout/BackArrowHeader";
import { RewardContainer } from "@/features/reward/components/RewardContainer";

const RewardPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <BackArrowHeader title="가챠 상품 등록" />
      <RewardContainer />
    </div>
  );
};
export default RewardPage;
