import AddUser from "@/components/addUser";
import { fetchUser } from "@/server";
export const runtime = 'edge';

export default async function UserManagement(){
    const listOfUsers=await fetchUser();
    return <>
    <div className="min-h-screen bg-slate-800">
    <h2 className=" text-white text-center  text-xl md:text-3xl font-extrabold">
    User Management
    </h2>
    <AddUser userList={listOfUsers.data}/>
    </div>
    </>
}