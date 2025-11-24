import React from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

const SignupForm = () => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email :"",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1 className="text-xl font-bold text-white text-center pb-5">
        Create New Account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* ACCOUNT HOLDER */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Enter Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IFSC */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Enter Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ACCOUNT NUMBER */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className=" cursor-pointer w-full py-4 text-lg font-medium bg-black text-white rounded-lg hover:bg-neutral-800"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
