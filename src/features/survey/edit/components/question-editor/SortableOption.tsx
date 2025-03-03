import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";

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
      <div {...attributes} {...listeners}>
        <GripVertical className="size-5 cursor-move touch-none text-gray-400" />
      </div>
      <Input
        type="text"
        value={option}
        onChange={e => onOptionChange(index, e.target.value)}
        placeholder={`옵션 ${index + 1}`}
        className="flex-1"
      />
      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOptionRemove(index)}
          className="text-red-500 hover:bg-red-50 hover:text-red-700"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
};
