import { ArrowRight } from "lucide-react";

import { LoadingCircle } from "@/components/LoadingCircle";

import { Textarea } from "../textarea";

interface Props extends React.ComponentProps<"textarea"> {}

export const TextareaWithButton = ({ ...props }: Props) => {
  return (
    <div className="relative">
      <Textarea className="peer bg-white pe-9" {...props} />
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Submit search"
        type="submit"
      >
        {/* <ArrowRight size={16} strokeWidth={2} aria-hidden="true" /> */}
        <LoadingCircle />
      </button>
    </div>
  );
};
