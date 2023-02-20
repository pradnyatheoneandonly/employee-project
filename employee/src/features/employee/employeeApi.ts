import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


type Employee = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    joinedDate: string;
    id:number
}
const API_URL = 'http://localhost:8000/employee'

export const getEmployees = createAsyncThunk("employee/getEmployees", async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const saveEmployees = createAsyncThunk("employee/saveEmployee", async (employee: Employee) => {
    try {
        const response = await axios.post(API_URL, employee)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateEmployee = createAsyncThunk("employee/updateEmployee",
    async (employee: Employee) => {
        try {
            const response = await axios.put(`${API_URL}/${employee.id}`, employee);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (employeeId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${employeeId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})