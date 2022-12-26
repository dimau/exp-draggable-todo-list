import React, { useCallback, useState } from "react";
import { initialData } from "./initialDate";
import { Column } from "./Column";
import { IState } from "./interfaces";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export function App() {
  const [state, setState] = useState<IState>(initialData);

  const handleOnDragEnd = useCallback((result: DropResult) => {}, []);

  const res = state.columnOrder.map((columnId) => {
    const column = state.columns[columnId];
    const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
    return <Column key={column.id} column={column} tasks={tasks} />;
  });

  return <DragDropContext onDragEnd={handleOnDragEnd}>{res}</DragDropContext>;
}
