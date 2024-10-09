"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { addUserFormControls, initialUserForm } from "@/utils/index";
export const runtime = 'edge';


export default function DialogBox({
  isDialogOpen,
  editItemId,
  setDialogOpen,
  loading,
  form,
  handleAction,
}: any) {
  function onSubmit(values: any) {
    handleAction(values);
  }
  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={() => {
          setDialogOpen(false);
          form.reset(initialUserForm);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-bold">
              {editItemId ? "Edit User" : "Add User"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {addUserFormControls.map((item: any) => {
                return (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input
                            type={item.type}
                            placeholder={item.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              <DialogFooter>
                <Button disabled={loading} type="submit">
                  {loading ? "Saving Changes..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
