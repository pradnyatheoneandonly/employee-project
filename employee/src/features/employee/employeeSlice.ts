import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {getEmployees,saveEmployees,deleteEmployee,updateEmployee} from './employeeApi'

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        list: {
            isLoading: false,
            status: "",
            values: []
        },
        save: {
            isSaving: false,
            isDeleting: false
        }
    },
    reducers: {
        clearSuccessMessage: (state, payload) => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: {
        [getEmployees.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getEmployees.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getEmployees.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        },
        [saveEmployees.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [saveEmployees.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [saveEmployees.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateEmployee.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [updateEmployee.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateEmployee.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [deleteEmployee.pending.type]: (state, action) => {
            state.save.isDeleting = true
        },
        [deleteEmployee.fulfilled.type]: (state, action) => {
            state.save.isDeleting = false
        },
        [deleteEmployee.rejected.type]: (state, action) => {
            state.save.isDeleting = false
        }
    }
})

export default employeeSlice.reducer