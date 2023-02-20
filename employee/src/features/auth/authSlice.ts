 /* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface AuthState {
    access_token: string | null,
    isAdmin: boolean | null,
    firstName:string|null
}

const initialState: AuthState = {
    access_token: null,
    isAdmin: null,
    firstName:null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ access_token: string; isAdmin: boolean;firstName:string }>) => {
            state.access_token = action.payload.access_token;
            state.isAdmin =action.payload.isAdmin;
            localStorage.setItem("user", JSON.stringify({
                access_token: action.payload.access_token,
                isAdmin: action.payload.isAdmin,
                firstName:action.payload.firstName
            })
           
            );
           
            
             
        },
        logOut:(state)=>{
            localStorage.clear();
            state.firstName=null;
            state.access_token=null;
            state.isAdmin=null;
        }
    },

})

export const selectAuth = (state: RootState) => state.auth
export const { setUser,logOut } = authSlice.actions
export default authSlice.reducer