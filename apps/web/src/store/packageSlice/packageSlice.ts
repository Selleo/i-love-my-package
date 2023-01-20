import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = packagesSlice.actions

export const { reducer } = packagesSlice
