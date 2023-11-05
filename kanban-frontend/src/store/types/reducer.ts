import { IBoard } from '../../types/kanban';
import { ACTIONS } from './actions';

export interface InitialState {
  currentBoard: IBoard;
}

export interface IKanbanAction {
  payload: IBoard;
  type: ACTIONS;
}
