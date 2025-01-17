import { ArrowRight, CircleCheck } from "lucide-react";

interface Props {
  label: string;
  linkLabel: string;
  link: string;
}

export function AlertWithLink({
  label = "성공!",
  linkLabel = "이동",
  link,
}: Props) {
  return (
    <div className="z-[100] max-w-[400px] rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5">
      <div className="flex gap-2">
        <div className="flex grow gap-3">
          <CircleCheck
            className="mt-0.5 shrink-0 text-emerald-500"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <div className="flex grow justify-between gap-12">
            <p className="text-sm">{label}</p>
            <a
              href={link}
              className="group whitespace-nowrap text-sm font-medium text-primary"
            >
              {linkLabel}
              <ArrowRight
                className="-mt-0.5 ms-1 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
