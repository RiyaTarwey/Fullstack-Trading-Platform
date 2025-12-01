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
import { useDispatch } from "react-redux";
import { addPaymentDetails } from "@/State/Withdrawal/Action";

const PaymentDetailsForm = () => {
  const diapatch = useDispatch();

  const form = useForm({
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: "",
    },
  });

  const onSubmit = (data) => {
    diapatch(
      addPaymentDetails({
        paymentDetails: data,
        jwt: localStorage.getItem("jwt"),
      })
    );
    console.log(data);
  };

  return (
    <div className="px-4 py-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white"
        >
          {/* ACCOUNT HOLDER */}
          <FormField
            control={form.control}
            name="accountHolderName"
            rules={{ required: "*Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-slate-700">
                  Account Holder Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Enter Account Holder Name"
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
            name="ifsc"
            rules={{ required: "*Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-slate-700">
                  IFSC Code
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Enter IFSC Code"
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
            name="accountNumber"
            rules={{ required: "*Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-slate-700">
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Enter Account Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONFIRM ACCOUNT NUMBER */}
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            rules={{ required: "*Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-slate-700">
                  Confirm Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Confirm Account Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* BANK NAME */}
          <FormField
            control={form.control}
            name="bankName"
            rules={{ required: "*Required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-slate-700">
                  Bank Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Enter Bank Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT BUTTON */}
          <DialogClose asChild>
            <Button
              type="submit"
              className=" cursor-pointer w-full py-4 text-lg font-medium bg-black text-white rounded-lg hover:bg-neutral-800"
            >
              Submit
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
