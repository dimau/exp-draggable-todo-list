import React from "react";
import { IColumn, ITask } from "./interfaces";
import styled from "styled-components";
import { Task } from "./Task";
import { Droppable } from "react-beautiful-dnd";

interface IColumnProps {
  column: IColumn;
  tasks: ITask[];
}

interface ITaskListProps {
  isDraggingOver: boolean;
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<ITaskListProps>`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  transition: background-color 200ms ease;
  flex-grow: 1;
  min-height: 100px;
`;

export function Column({ column, tasks }: IColumnProps) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
