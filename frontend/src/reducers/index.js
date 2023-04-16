import notesReducer from './notesReducer';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {notesReducer}
  })