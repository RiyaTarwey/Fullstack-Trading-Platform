import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarkIcon, DotIcon } from "lucide-react";
import React from "react";
import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";

export default function StockDetails() {
  return (
    <div className="p-5 mt-5">
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <div>
            <Avatar>
              <AvatarImage
                src={
                  "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png "
                }
              />
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p>BTC</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">Bitcoin</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">$6554</p>
              <p className="text-red-600">
                <span>-1319049822.578</span>
                <span>(-0.29803%)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Button className="cursor-pointer">
            {true ? (
              <BookmarkFilledIcon className="h-6 w-6 text-blue-200" />
            ) : (
              <BookmarkIcon className="h-6 w-6 text-gray-800" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button className="cursor-pointer" size="lg">
                {" "}
                Trade{" "}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How much you want to spend ?</DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-14">
        <StockChart/>
      </div>
    </div>
  );
}
