import Image from "next/image";

import Logo from "@/components/ui/logo";
import BottomButtonGroup from "@/features/homePage/components/BottomButtonGroup";
import MainButtonGroup from "@/features/homePage/components/MainButtonGroup";
import Title from "@/features/homePage/components/Title";
import {
  HOME_PAGE_BOTTOM_BUTTON_GROUP,
  HOME_PAGE_GACHA_IMAGE,
  HOME_PAGE_MAIN_BUTTON_GROUP,
  HOME_PAGE_TITLE,
} from "@/features/homePage/constant";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* background */}
      <section
        className="absolute left-0 top-0 h-[55vh] w-full bg-[#D1E2FF]"
      />
      <section
        className="absolute left-0 top-[55vh] h-[45vh] w-full bg-[#F4F4F5]"
      />
      {/* content */}
      <div className="relative h-full overflow-auto pb-40">
        <div className="pb-[18px] pl-5 pt-7">
          <Logo width={71} height={20} />
        </div>
        <Title title={HOME_PAGE_TITLE} />
        <div className="mr-10 flex justify-end">
          <Image
            src={HOME_PAGE_GACHA_IMAGE}
            alt="logo"
            width={250}
            height={225}
            className="translate-y-0.5"
          />
        </div>
        <MainButtonGroup mainButtonGroup={HOME_PAGE_MAIN_BUTTON_GROUP} />
        <BottomButtonGroup bottomButtonGroup={HOME_PAGE_BOTTOM_BUTTON_GROUP} />
      </div>
    </div>
  );
}
