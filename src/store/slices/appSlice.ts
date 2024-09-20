import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  sidebarOpen: boolean
}

const initialState: AppState = {
  sidebarOpen: false,
}

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleSidebar } = counterSlice.actions

export default counterSlice.reducer