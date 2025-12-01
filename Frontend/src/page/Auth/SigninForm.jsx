import React, { useCallback } from "react";
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
import { useDispatch } from "react-redux";
import { login } from "@/State/Auth/Action";
import { useNavigate } from "react-router-dom";

const SigninForm = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = useCallback(
    (data) => {
      dispatch(login({ data, navigate }));
      console.log(data);
    },
    [dispatch, navigate]
  );

  return (
    <div>
      <h1 className="text-xl font-bold text-white text-center pb-5 ">Login</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={control}
            name="email"
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

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black text-white"
                    placeholder="Enter Password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default SigninForm;
