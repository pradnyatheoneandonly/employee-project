import * as actionTypes from "./action.types"
import { EmployeeAction, EmployeeState, IEmployee } from "./type"

const initialState: EmployeeState = {
  employees: [
    {
      id: 1,
      firstName:"pradnya",
      lastName:"bhagwat",
      phone:"+65181818",
      gender:"female",
      email:"kakakaka@gmail.com",
      joinedDate:"12/1/2022"
     
      
    },
    {
      id: 2,
      firstName:"prasad",
      lastName:"bhagwat",
      phone:"+65181818",
      gender:"female",
      email:"kakakaka@gmail.com",
      joinedDate:"12/1/2022"
     
    },
  ]
}
const reducer = (
    state: EmployeeState = initialState,
    action: EmployeeAction
  ): EmployeeState => {
    switch (action.type) {
      case actionTypes.ADD_EMPLOYEE:
        const newEmployee: IEmployee = {
          id: Math.random(), // not really unique
          firstName: action.employee.firstName,
          lastName:action.employee.lastName,
          phone:action.employee.phone,
          gender:action.employee.phone,
          email:action.employee.email,
          joinedDate:action.employee.joinedDate
          
        }
        return {
          ...state,
          employees: state.employees.concat(newEmployee),
        }
      case actionTypes.REMOVE_EMPLOYEE:
        const updatedEmployees: IEmployee[] = state.employees.filter(
          employee => employee.id !== action.employee.id
        )
        return {
            ...state,
            employees: updatedEmployees,
          }
      }
      return state
    }
    
    export default reducer