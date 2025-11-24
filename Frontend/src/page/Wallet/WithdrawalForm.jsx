import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";

const WithdrawalForm = () => {
  const [amount, setAmount] = React.useState("");

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Withdrawal Amount:", amount);
  };

  return (
    <div className="pt-10 space-y-6 text-foreground">
      {/* Available Balance */}
      <div className="flex justify-between items-center rounded-md bg-card border border-border shadow-sm text-xl font-bold px-5 py-4">
        <p>Available Balance</p>
        <p>$9000</p>
      </div>

      {/* Withdrawal Input */}
      <div className="flex flex-col items-center px-7 py-5">
        <h1 className="pb-2 font-medium">Enter Withdrawal Amount</h1>

        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-2xl text-center bg-card text-foreground border border-border shadow-sm"
          placeholder="$9999"
          type="number"
        />
      </div>

      {/* Bank Card */}
      <div>
        <p className="pb-2 font-medium">Transfer to</p>

        <div className="flex items-center gap-5 bg-card border border-border rounded-md px-5 py-3 shadow-sm">
          <img
            className="h-8 w-8 rounded-sm"
            src="https://c8.alamy.com/comp/P28454/bank-vector-icon-isolated-on-transparent-background-bank-logo-concept-P28454.jpg"
          />

          <div className="flex flex-col">
            <p className="text-lg font-semibold">Yes Bank</p>
            <p className="text-xs text-muted-foreground">**********1651</p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full py-7 mt-5 text-white bg-black hover:bg-neutral-900"
        >
          Withdraw ${amount || "0"}
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawalForm;
