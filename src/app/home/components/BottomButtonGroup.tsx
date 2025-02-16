import { CautionIcon } from "@/assets/icons/caution";
import { CheckIcon } from "@/assets/icons/check";

export const HOME_PAGE_BOTTOM_BUTTON_GROUP = [
  {
    id: 1,
    icon: <CheckIcon />,
    title: [
      "참여한",
      "설문조사",
    ],
  },
  {
    id: 2,
    icon: <CautionIcon />,
    title: [
      "진행한",
      "설문조사",
    ],
  },
];

export function BottomButtonGroup() {
  return (
    <section className="fixed bottom-0 w-full max-w-md rounded-t-xl bg-[#E5E7EB] p-4 pb-10">
      <div className="flex items-center justify-between gap-2">
        {HOME_PAGE_BOTTOM_BUTTON_GROUP.map(item => (
          <button key={item.id} className="flex w-full items-center gap-4 rounded-lg bg-white px-5 py-6 font-semibold text-black">
            <div className="flex size-10 items-center justify-center">
              {item.icon}
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
