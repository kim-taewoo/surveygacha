import { cn } from "@/lib/utils";

interface Props {
  scale: number;
  children: React.ReactNode;
  className?: string;
}

export const ScaleWrapper = ({ scale = 1, children, className = "" }: Props) => {
  return (
    <div
      className={cn("inline-block", className)}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {children}
    </div>
  );
};
