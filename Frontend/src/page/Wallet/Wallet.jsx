// src/pages/WalletPage.jsx (or wherever you keep it)
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/State/Wallet/Action";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function WalletPage() {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const navigate = useNavigate();

  // fetchers
  const handleFetchUserWallet = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(getUserWallet(jwt));
  }, [dispatch]);

  const handleFetchWalletTransactions = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(getWalletTransactions(jwt));
  }, [dispatch]);

  // on mount fetch wallet & transactions
  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransactions();
  }, [handleFetchUserWallet, handleFetchWalletTransactions]);

  // handle deposit callback params from query
  useEffect(() => {
    if (orderId) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorpayPaymentId || paymentId,
          navigate,
        })
      );
    }
    // if you want to refresh transactions after deposit, you can fetch them here:
    // handleFetchWalletTransactions();
  }, [orderId, paymentId, razorpayPaymentId, dispatch, navigate]);

  // copy helper
  function copyToClipboard(text) {
    if (!text) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => console.log("Text copied to clipboard!"))
        .catch((err) => console.error("Failed to copy text: ", err));
      return;
    }

    // fallback
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand("copy");
      console.log("Text copied (fallback)!");
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(el);
  }

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
                    <p className="text-gray-600 text-sm">
                      #{wallet?.userWallet?.id ?? "N/A"}
                    </p>
                    <Copy
                      onClick={() => copyToClipboard(wallet?.userWallet?.id)}
                      size={12}
                      className="cursor-pointer text-slate-600 hover:text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ReloadIcon
              onClick={() => {
                handleFetchUserWallet();
                handleFetchWalletTransactions();
              }}
              className="w-6 h-6 text-slate-700 hover:text-slate-900 cursor-pointer absolute top-5 right-5"
            />
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="text-slate-700" />
              <span className="text-2xl font-semibold text-slate-800">
                {wallet?.userWallet?.balance ?? 0}
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
            <h1 className="text-2xl font-semibold">History</h1>
            <UpdateIcon
              onClick={handleFetchWalletTransactions}
              className="p-0 h-7 w-7 cursor-pointer hover:text-gray-400"
            />
          </div>

          <div className="space-y-5">
            {wallet?.transactions?.length ? (
              wallet.transactions.map((item, index) => (
                <div key={index}>
                  <Card className="lg:w-[50] px-5 py-2 flex justify-between ">
                    <div className="flex items-center gap-5">
                      <Avatar>
                        <AvatarFallback>
                          <ShuffleIcon />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h1>{item.type || item.purpose}</h1>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end w-full">
                      <span
                        className={`text-lg font-semibold ${
                          Number(item.amount) > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.amount} USD
                      </span>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No transactions yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
