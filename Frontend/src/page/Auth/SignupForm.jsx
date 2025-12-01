import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { register } from "@/State/Auth/Action";
import { useNavigate } from "react-router-dom";

const SignupForm = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  // stable callback
  const onSubmit = useCallback(
    async (data) => {
      const res = await dispatch(register(data)); // wait for API

      console.log(data);

      // If registration is successful → redirect user
      navigate("/"); // change this to your home route
    },
    [dispatch, navigate]
  );

  return (
    <div>
      <h1 className="text-xl font-bold text-white text-center pb-5">
        Create New Account
      </h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* FULL NAME */}
          <FormField
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black text-white"
                    placeholder="Enter Full Name"
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black text-white"
                    placeholder="Enter Email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD */}
          <FormField
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black text-white"
                    placeholder="Enter Password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full py-4 text-lg font-medium bg-black text-white rounded-lg hover:bg-neutral-800"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
});

export default SignupForm;
