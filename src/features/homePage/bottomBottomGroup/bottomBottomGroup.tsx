import Image from "next/image";

import { IHomePageBottomButtonGroup } from "@/features/homePage/types";

interface IBottomButtonGroup {
  bottomButtonGroup: IHomePageBottomButtonGroup[];
}

export default function BottomButtonGroup({ bottomButtonGroup }: IBottomButtonGroup) {
  return (
    <section className="fixed bottom-0 w-full max-w-765px rounded-t-xl bg-[#E5E7EB] p-5 pb-10">
      <div className="flex w-full items-center justify-center gap-2">
        {bottomButtonGroup.map(item => (
          <button key={item.id} className="flex w-full gap-4 rounded-lg bg-white px-5 py-6 font-semibold text-black">
            <div className="flex items-center justify-center">
              <Image src={item.icon} alt="logo" width={40} height={40} />
            </div>
            <div>
              {item.title.map((line, index) => (
                <p key={index} className="whitespace-nowrap text-base leading-5">
                  {line}
                  {index < item.title.length - 1 && <br />}
                </p>
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
