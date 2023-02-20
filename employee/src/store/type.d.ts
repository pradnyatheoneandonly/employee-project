export interface IEmployee {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    joinedDate: string;
    id: number;
  }
  
  type EmployeeState = {
    employees: IEmployee[]
  }
  
  type EmployeeAction = {
    type: string
    employee: IEmployee
  }
  
  type DispatchType = (args: EmployeeAction) => EmployeeAction