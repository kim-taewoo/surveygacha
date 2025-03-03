import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AlignJustify, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SortableOptionProps = {
  id: string;
  option: string;
  index: number;
  onOptionChange: (index: number, value: string) => void;
  onOptionRemove: (index: number) => void;
  canRemove: boolean;
};

// TODO: onOptionChange 를 디바운싱으로 동기화해야지 제대로 입력가능할 듯 하다. 아니면 다른 방법 생각
export const SortableOption = ({ id, option, index, onOptionChange, onOptionRemove, canRemove }: SortableOptionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 ${isDragging ? "bg-gray-50 opacity-50" : ""}`}
    >
      <div className="relative w-full">
        <Input
          type="text"
          value={option}
          onChange={e => onOptionChange(index, e.target.value)}
          placeholder={`옵션 ${index + 1}`}
          className="peer pe-9 ps-9"
        />
        <div {...attributes} {...listeners} className="absolute inset-y-0 start-0 flex cursor-move items-center justify-center ps-3 peer-disabled:opacity-50">
          <AlignJustify size={16} className="touch-none text-gray-400" />
        </div>
        {canRemove && (
          <div className="absolute inset-y-0 end-0 flex cursor-move items-center justify-center peer-disabled:opacity-50">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOptionRemove(index)}
              className="text-blue-500 hover:bg-blue-50 hover:text-blue-700"
            >
              <X className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
