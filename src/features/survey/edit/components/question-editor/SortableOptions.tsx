import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";

import { QuestionType } from "@/features/survey/types";

import { SortableOption } from "./SortableOption";

interface Props {
  options: string[];
  questionType: QuestionType;
  onOptionValueChange: (index: number, value: string) => void;
  onOptionsChange: (newOptions: string[]) => void;
}

export function SortableOptions({ options, questionType, onOptionValueChange, onOptionsChange }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (!options) return;
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = options.findIndex(x => `option-${x}` === active.id);
      const newIndex = options.findIndex(x => `option-${x}` === over?.id);

      onOptionsChange(arrayMove(options, oldIndex, newIndex));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    onOptionValueChange(index, value);
  };

  const handleRemoveOption = (index: number) => {
    onOptionsChange(options.filter((_, i) => i !== index));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={options.map(option => `option-${option}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {options.map((option, index) => (
            <SortableOption
              key={`option-${index}`}
              id={`option-${option}`}
              option={option}
              index={index}
              onOptionChange={handleOptionChange}
              onOptionRemove={handleRemoveOption}
              canRemove={questionType !== "likert_scale" && (options ?? []).length > 1}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
