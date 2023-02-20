import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8000/auth"
    }),
    endpoints:(builder)=>({
        loginUser:builder.mutation({
            query:(body:{email:string,password:string})=>{
                return{
                    url:"/login",
                    method:"post",
                    body
                }
            }
        })
    })
})

export const {useLoginUserMutation}=authApi