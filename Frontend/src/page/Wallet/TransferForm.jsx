import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";

const TransferForm = () => {
  const [formData, setFormData] = React.useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="pt-10 space-y-6 text-foreground">
      <div>
        <h1 className="pb-1 font-medium">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-7 bg-card text-foreground border border-border shadow-sm"
          placeholder="$9999"
        />
      </div>

      <div>
        <h1 className="pb-1 font-medium">Wallet Id</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-7 bg-card text-foreground border border-border shadow-sm"
          placeholder="#ADER455"
        />
      </div>

      <div>
        <h1 className="pb-1 font-medium">Purpose</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-7 bg-card text-foreground border border-border shadow-sm"
          placeholder="gift for you.........."
        />
      </div>

      <DialogClose className="w-full">
        <Button
          className="w-full py-7 text-white bg-black hover:bg-neutral-900 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm;
