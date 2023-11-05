export interface KanbanResponse {
  data: DataBoard;
}

interface DataBoard {
  boards: IBoard[];
}

export interface IBoard {
  _v?: number;
  _id?: string;
  name: string;
  columns: IColumn[];
  tasks: ITask[];
}

export interface IColumn {
  _id?: string;
  status: string;
  color: string;
}

export interface ITask {
  _id?: string;
  description: string;
  subtasks: ISubtask[];
  title: string;
  status: string;
  column: string;
}

export interface ISubtask {
  _id?: string;
  completed: boolean;
  label: string;
}
