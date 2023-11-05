'use client';

import { ACTIONS } from '../types/actions';
import { IKanbanAction, InitialState } from '../types/reducer';

const initialState: InitialState = {
  currentBoard: {
    _v: 0,
    _id: '',
    name: '',
    columns: [],
    tasks: [],
  },
};

export const KanbanReducer = (state = initialState, action: IKanbanAction) => {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_BOARD:
      return {
        ...state,
        currentBoard: action.payload,
      };
    default:
      return state;
  }
};
