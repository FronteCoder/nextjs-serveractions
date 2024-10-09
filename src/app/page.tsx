import UserManagement from "./user-management/page";
export const runtime = 'edge';


export default function Root(){
  
  return <>
  <UserManagement />
  </>
}