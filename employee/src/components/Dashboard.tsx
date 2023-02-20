
import React, {useState} from "react";
import Employee from './employee'
import {Button} from 'antd'
import { UserView } from '../features/employee/Employee.view'
import { theme } from 'antd';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logOut, selectAuth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  
}

interface FuncProps {
  //here you can declare the return type (here is void)
  setAddEmployee: (values: any) => void;
  addEmp:boolean
}

const Dashboard :React.FC<Props> = ({}) => { 
  const[addEmp,setAddEmployee]=useState(false);
  const {firstName}=useAppSelector(selectAuth)
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const record={firstName:''}
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
//api call



const userData:any =(localStorage.getItem("user"));
  const user = JSON.parse(userData);
 
    return (
      <>
     
      { addEmp ? <Employee setAddEmployee={setAddEmployee} addEmp={addEmp} records={record}/>:''}
        {userData && user.isAdmin ?<Button type="primary" style={{marginLeft:"90%"}} onClick={()=>setAddEmployee(true)}>Add employee</Button>:''} 

       {userData && user.access_token ?<UserView/>:<h2>Please Login....</h2>} 
      </>
  
  
    )

}

export default Dashboard;
