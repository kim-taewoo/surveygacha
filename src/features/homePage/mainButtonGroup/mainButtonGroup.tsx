import Image from "next/image";

import { IHomePageMainButtonGroup } from "@/features/homePage/types";

interface MainButtonGroupProps {
  mainButtonGroup: IHomePageMainButtonGroup[];
}

export default function MainButtonGroup({ mainButtonGroup }: MainButtonGroupProps) {
  return (
    <section className="grid gap-3">
      {mainButtonGroup.map(button => (
        <button
          className="mx-5 flex items-center justify-between rounded-lg bg-white p-4"
          key={button.id}
        >
          <Image
            src={button.icon}
            alt={button.title}
            width={40}
            height={40}
            className="shrink-0"
          />
          <div className="flex-1 pl-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold leading-5">{button.title}</h2>
              <Image
                src={button.arrowIcon}
                alt="arrow"
                width={24}
                height={24}
                className="shrink-0"
              />
            </div>
            <p className="mt-2 text-sm leading-4 text-gray-500">{button.description}</p>
          </div>
        </button>
      ))}
    </section>
  );
};
