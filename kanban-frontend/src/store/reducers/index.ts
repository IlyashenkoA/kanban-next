'use client';

import { combineReducers } from 'redux';
import { KanbanReducer } from './KanbaReducer';

export const rootReducer = combineReducers({
  KanbanReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
