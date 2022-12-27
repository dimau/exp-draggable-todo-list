import React, { useCallback, useState } from "react";
import { initialData } from "./initialDate";
import { Column } from "./Column";
import { IState } from "./interfaces";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from "react-beautiful-dnd";

export function App() {
  const [state, setState] = useState<IState>(initialData);

  const handleOnDragStart = (start: DragStart) => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 200ms ease";
  };

  const handleOnDragUpdate = (update: DragUpdate) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity}`;
  };

  const handleOnDragEnd = (result: DropResult) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
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

  return (
    <DragDropContext
      onDragStart={handleOnDragStart}
      onDragUpdate={handleOnDragUpdate}
      onDragEnd={handleOnDragEnd}
    >
      {res}
    </DragDropContext>
  );
}
