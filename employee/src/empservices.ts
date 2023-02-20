import axios from "axios"
export class EmployeeService{
    private static URL:string = 'http://localhost:8000'
    public static getAllEmployees(){
      return axios.get(`${this.URL}/employee`)
    }
   
    public static saveEmployees(data: any){
        return axios.post('http://localhost:8000/employees',data.user)
      }
}