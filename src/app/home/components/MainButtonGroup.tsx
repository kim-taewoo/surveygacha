import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { HomeIcon1 } from "@/assets/icons/home1";
import { HomeIcon2 } from "@/assets/icons/home2";

export const HOME_PAGE_MAIN_BUTTON_GROUP = [
  {
    id: 1,
    icon: <HomeIcon1 />,
    title: "AI로 설문조사 자동 생성",
    description: "AI로 설문조사 자동 생성",
    arrowColor: "#0056EB",
    href: "/gen",
  },
  {
    id: 2,
    icon: <HomeIcon2 />,
    title: "설문조사 수동 생성",
    description: "설문조사 수동 생성",
    arrowColor: "#6B7280",
    href: "/edit",
  },
];

export function MainButtonGroup() {
  return (
    <section className="flex -translate-y-6 flex-col gap-3">
      {HOME_PAGE_MAIN_BUTTON_GROUP.map(button => (
        <Link className="w-full px-5" href={button.href} key={button.id}>
          <button
            className="flex w-full items-center justify-between rounded-lg bg-white px-5 py-6"
            key={button.id}
          >
            {button.icon}
            <div className="flex-1 pl-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold leading-5">{button.title}</h2>
                <ArrowRight color={button.arrowColor} size={24} />
              </div>
              <p className="mt-2 text-start text-sm leading-4 text-gray-500">{button.description}</p>
            </div>
          </button>
        </Link>
      ))}
    </section>
  );
};
