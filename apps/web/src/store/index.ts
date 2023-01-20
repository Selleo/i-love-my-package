import { configureStore } from '@reduxjs/toolkit'
import { packageReducer } from './packageReducer'

export const store = configureStore({
  reducer: {
    [packageReducer.reducerPath]: packageReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(packageReducer.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})
