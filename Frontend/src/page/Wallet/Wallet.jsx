import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReloadIcon, ShuffleIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Wallet, Copy, DollarSign, UploadIcon } from "lucide-react";
import TopupForm from "./TopupForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    

export default function WalletPage() {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card className="bg-slate-50 border border-slate-200">
          <CardHeader className="pb-9 relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <Wallet size={30} className="text-slate-800" />
                <div>
                  <CardTitle className="text-2xl text-slate-900">
                    My Wallet
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600 text-sm">#A475Ed</p>
                    <Copy
                      size={12}
                      className="cursor-pointer text-slate-600 hover:text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ReloadIcon className="w-6 h-6 text-slate-700 hover:text-slate-900 cursor-pointer absolute top-5 right-5" />
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="text-slate-700" />
              <span className="text-2xl font-semibold text-slate-800">
                2000
              </span>
            </div>

            <div className="flex gap-7 mt-5">
              <Dialog>
                <DialogTrigger>
                  <div
                    className="h-24 w-24 hover:text-gray-400 cursor-pointer
                    flex flex-col items-center justify-center rounded-md 
                    shadow-slate-800 shadow-md bg-white"
                  >
                    <UploadIcon />
                    <span className="text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top up your Wallet</DialogTitle>
                  </DialogHeader>
                  <TopupForm />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div
                    className="h-24 w-24 hover:text-gray-400 cursor-pointer
                    flex flex-col items-center justify-center rounded-md 
                    shadow-slate-800 shadow-md bg-white"
                  >
                    <UploadIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div
                    className="h-24 w-24 hover:text-gray-400 cursor-pointer
                    flex flex-col items-center justify-center rounded-md 
                    shadow-slate-800 shadow-md bg-white"
                  >
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer Money</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transfer to other Wallet</DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <div className="py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-2xl font font-semibold">History</h1>
            <UpdateIcon className="w-7 h-7 p-0 cursor-pointer hover:text-gray-400" />
          </div>

          <div className="space-y-5">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (
              <div key={i}>
                <Card className=" px-5 flex justify-between p-2">
                  <div>
                    <div className="flex items-center gap-5">
                      <Avatar>
                        <AvatarFallback>
                          <ShuffleIcon className="" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h1>Buy Asset</h1>
                        <p className="text-sm text-gray-500">2024-06-02</p>
                      </div>
                    </div>
                    <div className="text-right w-full">
                      <p className="text-green-500">500 USD</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
