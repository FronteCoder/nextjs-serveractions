import { number } from "joi";

 
 export const addUserFormControls = [
  {
    name: "firstname",
    label: "First Name",
    placeholder: "Please Enter First Name",
    type:"text"
  },
  {
    name: "lastname",
    label: "Last Name",
    placeholder: "Please Enter Last Name",
    type:'text'
  },
  {
    name: "mobilenumber",
    label: "Mobile No.",
    placeholder: "Please Enter Mobile No.",
    type:'number'
  },
  {
    name: "address",
    label: "Address",
    type:'text',
    placeholder: "Please Enter Address",
  },
];
interface initialUserForm{
  firstname:string,
  lastname:string,
  mobilenumber:number|undefined,
  address:string
}
export const initialUserForm:initialUserForm={
  firstname:"",
  lastname:"",
  mobilenumber:undefined,
  address:""
}
