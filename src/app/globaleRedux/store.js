import { configureStore } from '@reduxjs/toolkit'
import drawerSlice from './features/drawerSlice'
import globalSlice from './features/globalSlice'
import themeSlice from './features/theme/theme'

export const store = configureStore({
  reducer: {
    global: globalSlice,
    drawer: drawerSlice,
    theme: themeSlice,
  },
})
