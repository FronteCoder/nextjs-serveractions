"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import DialogBox from "../user-dialogbox";
import { createUser, deleteUser, UpdateUser } from "@/server";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useRouter } from "next/navigation";
import { initialUserForm } from "@/utils";
const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  address: z.string(),
  mobilenumber: z.coerce
    .number()
    .gte(1000000000, { message: "Mobile No should be of 10 digits" })
    .lt(10000000000, { message: "Mobile No should be of 10 digits" }),
});
export default function AddUser({ userList }: any) {
  const router=useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      address: "",
    },
  });
  async function handleAddNewUser(user: any) {
    if (editItemId) {
      setLoading(true);
      const result = await UpdateUser(user,editItemId);
      setEditItemId(null);
      setLoading(false);
      form.reset(initialUserForm);
      setDialogOpen(false);
      router.refresh()
     
    } else {
      setLoading(true);
      const result = await createUser(user);
      setLoading(false);
      form.reset(initialUserForm);
      setDialogOpen(false);
      router.refresh();
    }
  }
  async function handleUserDelete(id:any){
    const result=await deleteUser(id);
    console.log(result);
    router.refresh()
  }
  function onEditClick(item:any){
    setEditItemId(item?._id);
    form.reset(item);
    setDialogOpen(true);
  }
  return (
    <>
      <Button
        onClick={() => {
          setDialogOpen(true);
        }}
        className="bg-white text-gray-950 rounded-sm m-5 pr-5 pl-5 hover:text-black hover:bg-white hover:font-extrabold"
      >
        Add User
      </Button>
      <DialogBox
        isDialogOpen={isDialogOpen}
        editItemId={editItemId}
        setDialogOpen={setDialogOpen}
        loading={loading}
        form={form}
        handleAction={handleAddNewUser}
      />
      {userList?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {userList.map((user: any) => {
            return (
              <Card key={user._id} className="m-5">
                <CardHeader className="font-bold sm:text-xl ld:text-2xl text-center antialiased">
                  {user.firstname.toUpperCase() +
                    " " +
                    user.lastname.toUpperCase()}
                </CardHeader>
                <CardContent className="felx flex-col gap-2">
                  <p className="text-gray-950 antialiased">
                    Mobile Number: {user.mobilenumber}
                  </p>
                  <p className="text-gray-950 antialiased">
                    Address: {user.address}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-row-reverse gap-3">
                  <Button onClick={()=>{
                    onEditClick(user)
                  }}>Edit</Button>
                  <Button onClick={()=>{
                  handleUserDelete(user._id)
                  }}>Delete</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="h-screen flex justify-center mt-20">
          <Label className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
            No Users To Display.
          </Label>
        </div>
      )}
    </>
  );
}
