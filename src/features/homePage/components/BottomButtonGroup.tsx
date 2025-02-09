import Image from "next/image";

import { IHomePageBottomButtonGroup } from "@/features/homePage/types";

interface IBottomButtonGroup {
  bottomButtonGroup: IHomePageBottomButtonGroup[];
}

export default function BottomButtonGroup({ bottomButtonGroup }: IBottomButtonGroup) {
  return (
    <section className="fixed bottom-0 w-full max-w-md rounded-t-xl bg-[#E5E7EB] p-4 pb-5">
      <div className="flex gap-2">
        {bottomButtonGroup.map(item => (
          <button key={item.id} className="flex w-full gap-4 rounded-lg bg-white px-5 py-6 font-semibold text-black">
            <div className="flex size-10 items-center justify-center">
              <Image src={item.icon} alt="logo" width={40} height={40} />
            </div>
            <div>
              {item.title.map((line, index) => (
                <p key={index} className="whitespace-nowrap text-start text-base leading-5">
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
