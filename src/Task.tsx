import React from "react";
import { ITask } from "./interfaces";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

interface ITaskProps {
  task: ITask;
  index: number;
}

export function Task({ task, index }: ITaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}
