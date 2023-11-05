import { IBoard } from '@/types/kanban';
import { ACTIONS } from '../types/actions';

export const setActiveBoard = (board: IBoard) => {
  return { type: ACTIONS.SET_ACTIVE_BOARD, payload: board };
};
