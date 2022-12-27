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
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

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

    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...startColumn,
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
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [startColumn.id]: newStartColumn,
        [finishColumn.id]: newFinishColumn,
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
      <Container>{res}</Container>
    </DragDropContext>
  );
}
