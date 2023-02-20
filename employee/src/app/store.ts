import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi'
import {setupListeners} from '@reduxjs/toolkit/query/react'

import employeeSlice from '../features/employee/employeeSlice'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer,
    employee: employeeSlice,
  },
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware().concat(authApi.middleware)
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)