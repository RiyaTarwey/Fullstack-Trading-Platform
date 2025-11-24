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

const ForgotPasswordForm = () => {
     const form = useForm({
             defaultValues: {
               email :"",
             },
           });
         
           const onSubmit = (data) => {
             console.log(data);
           };
  return (
    <div>
      <h1 className="text-xl font-bold text-white text-center pb-3">Forgot password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* IFSC */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black"
                    placeholder="Enter Your Email ........"
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
}

export default ForgotPasswordForm
