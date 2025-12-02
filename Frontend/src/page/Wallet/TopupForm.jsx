import { DotFilledIcon } from "@radix-ui/react-icons";
import * as RadioGroup from "@radix-ui/react-radio-group";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { paymentHandler } from "@/State/Wallet/Action";

const TopupForm = () => {
  const [amount, setAmount] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY");
  const dispatch = useDispatch();



  const handleSubmit = () => {
    console.log("Amount:", amount);
    console.log("Payment Method:", paymentMethod);
    dispatch(paymentHandler({jwt:localStorage.getItem("jwt"),
      paymentMethod,
      amount
    }))
  }

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className="pb-1 text-foreground">Enter Amount</h1>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className="py-7 text-lg bg-card text-foreground border border-border"
          placeholder="$9999"
        />
      </div>

      <div>
        <h1 className="pb-1 text-foreground">Payment method</h1>

        <RadioGroup.Root
          className="flex"
          onValueChange={(val) => setPaymentMethod(val)}
          defaultValue="RAZORPAY"
        >
          <div className="flex items-center space-x-3 border border-border bg-card p-3 px-5 rounded-md shadow-sm">
            <RadioGroup.Item
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center bg-background"
              value="RAZORPAY"
            >
              <RadioGroup.Indicator>
                <DotFilledIcon className="h-9 w-9 text-primary cursor-pointer" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>

            <Label htmlFor="r1" className="cursor-pointer">
              <div className="bg-card border border-border rounded-md px-5 py-2 w-32 shadow-sm flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                  className="h-5"
                />
              </div>
            </Label>
          </div>
          {/* <div className="flex items-center space-x-3 border border-border bg-card p-3 px-5 rounded-md shadow-sm">
            <RadioGroup.Item
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center bg-background"
              value="STRIPE"
            >
              <RadioGroup.Indicator>
                <DotFilledIcon className="h-9 w-9 text-primary cursor-pointer" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>

            <Label htmlFor="r1" className="cursor-pointer">
              <div className="bg-card border border-border rounded-md px-5 py-2 w-32 shadow-sm flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png"
                  className="h-5"
                />
              </div>
            </Label>
          </div> */}
        </RadioGroup.Root>
      </div>
      <Button  onClick={handleSubmit} className="w-full py-7">Submit</Button>
    </div>
  );
};

export default TopupForm;
