export interface ITask {
  id: string;
  content: string;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface IState {
  tasks: {
    [taskId: string]: ITask;
  };
  columns: {
    [col: string]: IColumn;
  };
  columnOrder: string[];
}
