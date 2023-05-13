import notesReducer from './notesReducer';
import authReducer from './authReducer';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {notesReducer,authReducer}
  })