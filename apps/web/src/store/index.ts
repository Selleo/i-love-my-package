import { configureStore } from '@reduxjs/toolkit'
import { packageReducer } from './packageReducer'

export const store = configureStore({
  reducer: {
    [packageReducer.reducerPath]: packageReducer.reducer,
  },
})
