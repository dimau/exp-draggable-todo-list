import React from "react";
import { ITask } from "./interfaces";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

interface IContainerProps {
  isDragging: boolean;
}

const Container = styled.div<IContainerProps>`
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

interface ITaskProps {
  task: ITask;
  index: number;
}

export function Task({ task, index }: ITaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}
