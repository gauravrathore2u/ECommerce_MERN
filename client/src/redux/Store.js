import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice'
import productsSliceReducer from './productsSlice'

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    products: productsSliceReducer
  }
})