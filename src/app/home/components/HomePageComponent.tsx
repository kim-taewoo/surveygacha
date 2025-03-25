import { BottomButtonGroup } from "@/app/home/components/BottomButtonGroup";
import { MainButtonGroup } from "@/app/home/components/MainButtonGroup";
import Logo from "@/assets/logo";
import { CapsulesSVG } from "@/components/gacha/CapsulesSVG";
import { GachaMachineAnimation } from "@/components/gacha/GachaMachineAnimation";

export function HomePageComponent() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden shadow-sm">
      <section
        className="flex h-[55vh] w-full flex-col justify-between bg-[#D1E2FF]"
      >
        <div className="flex h-16 items-center px-5 pt-7">
          <Logo width={71} height={20} />
        </div>
        <div className="px-6 py-8">
          <h1 className="text-2xl font-semibold leading-8">
            서베이가챠를 통해
            <br />
            더 많은 응답을 받아보세요
          </h1>
        </div>
        <div className="mb-4 mr-9 flex items-end justify-end">
          <CapsulesSVG className="translate-x-3 translate-y-1 justify-items-end" />
          <GachaMachineAnimation className="w-2/5" />
        </div>
      </section>
      <MainButtonGroup />
      <BottomButtonGroup />
    </div>
  );
}
