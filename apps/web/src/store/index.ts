import { configureStore } from '@reduxjs/toolkit'
import { reducer as packagesReducer } from './packageSlice'

export const store = configureStore({
  reducer: {
    packages: packagesReducer,
  },
})
