import React, { useCallback, useState } from "react";
import { initialData } from "./initialDate";
import { Column } from "./Column";
import { IState } from "./interfaces";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export function App() {
  const [state, setState] = useState<IState>(initialData);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);
  };

  const res = state.columnOrder.map((columnId) => {
    const column = state.columns[columnId];
    const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
    return <Column key={column.id} column={column} tasks={tasks} />;
  });

  return <DragDropContext onDragEnd={handleOnDragEnd}>{res}</DragDropContext>;
}
