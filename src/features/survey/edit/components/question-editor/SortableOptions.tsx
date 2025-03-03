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
} from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";

import { SortableOption } from "./SortableOption";

interface Props {
  options: string[];
}

export function SortableOptions({ options }: Props) {
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

      updateQuestionOptions(question.id, arrayMove(options, oldIndex, newIndex));
    }
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
              key={`option-${option}`}
              id={`option-${option}`}
              option={option}
              index={index}
              onOptionChange={handleOptionChange}
              onOptionRemove={removeOption}
              canRemove={question.type !== "likert_scale" && (question?.options ?? []).length > 1}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
