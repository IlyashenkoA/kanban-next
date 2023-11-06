import { ISubtask } from '@/types/kanban';

type ColumnFormValues = {
  _id?: string;
  status: string;
  color: string;
  tasks: {
    _id?: string;
    description: string;
    subtasks: {
      _id?: string;
      completed: boolean;
      label: string;
    }[];
    title: string;
  }[];
};

export interface IFormValues {
  boardName: string;
  taskName: string;
  description: string;
  status: string;
  subtasks: ISubtask[];
  columns: ColumnFormValues[];
}

export interface ILoginFormValues {
  email: string;
  password: string;
}
