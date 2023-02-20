import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { getEmployees,deleteEmployee } from './employeeApi'
import { Table ,Button,Popconfirm} from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Employee from '../../components/employee'
interface FuncProps {
  //here you can declare the return type (here is void)
  setAddEmployee: (values: any) => void;
  addEmp:boolean;
  records:any
}
export const UserView = () => {
  //const user:any = useAppSelector(state => state.user)
  const [record,setRecord]=useState();
const[addEmp,setAddEmployee]=useState(false);
  const dispatch = useAppDispatch()
  const employeeList = useSelector(
    (state: RootState) => state.employee.list.values
  );
  const user = JSON.parse(localStorage.getItem('user')||"{}")

  const handleDelete = async(record:any) => {
  dispatch(deleteEmployee(record.id)).then((res)=>{
    dispatch(getEmployees())
  })
}
  const handleEdit = async(record:any) => {
    setRecord(record);
    setAddEmployee(true)
  };
  
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Joined Date',
        dataIndex: 'joinedDate',
        key: 'joinedDate',
      },
       {
         title: 'Action',
        width: 150,
        
        render: (text:any, record:any, index:any) => <span style={{fontWeight: 'bold'}}>
        
  
          <Popconfirm title="sure to delete?" onConfirm={() => handleDelete(record)}>
            <a>Delete</a>
          </Popconfirm>
  
      </span>
    },
   {
      title: 'Action',
      width: 150,
      
      render: (text:any, record:any, index:any) => <span style={{fontWeight: 'bold'}}>
      

        <Popconfirm title="Do you want to update records?" onConfirm={() => handleEdit(record)}>
          <a>Edit</a>
        </Popconfirm>

    </span>
  }
  ];

  const columnsEmp = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Joined Date',
        dataIndex: 'joinedDate',
        key: 'joinedDate',
      },
      
  
  ];
  useEffect(() => {
    dispatch(getEmployees())
  }, [])
  return (
    <div>
      
    
    {addEmp && <Employee setAddEmployee={setAddEmployee} addEmp={addEmp} records={record}/>}
      { employeeList.length ? (
        <Table  
        columns={user && user.isAdmin ?columns:columnsEmp} dataSource={employeeList} /> 
      ) : null}
    </div>
  )
}