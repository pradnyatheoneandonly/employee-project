import * as actionTypes from "./action.types"
import { DispatchType, EmployeeAction, EmployeeState, IEmployee } from "./type"

export function saveEmployees(employee: IEmployee) {
    const action: EmployeeAction = {
      type: actionTypes.SAVE_EMPLOYEE,
      employee,
    }
  
    return simulateHttpRequest(action)
  }

export function addArticle(employee: IEmployee) {
  const action: EmployeeAction = {
    type: actionTypes.ADD_EMPLOYEE,
    employee,
  }

  return simulateHttpRequest(action)
}

export function removeArticle(employee: IEmployee) {
  const action: EmployeeAction = {
    type: actionTypes.REMOVE_EMPLOYEE,
    employee,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: EmployeeAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}