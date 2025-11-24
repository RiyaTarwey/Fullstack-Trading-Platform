import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { DotIcon } from 'lucide-react';
import React, { useState } from "react";


const TradingForm = () => {
    const [orderType,setOrderType]=useState("BUY")
    const handleChange =()=>{

    }
  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter Amount...."
            onChange={handleChange}
            type="number"
            name="amount"
          />
          <div>
            <p className="borde text-2xl flex justify-center w-36 h-14 rounded-md">
              4563
            </p>
          </div>
        </div>
        {false && (
          <h1 className="text-red-600 text-center pt-4">
            Insufficent wallet balance to buy
          </h1>
        )}
      </div>

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
      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>
      <div className="flex items-center justify-between">
        <p>{orderType == "BUY" ? "Available Case" : "Available Quantity"}</p>
        <p>{orderType == "BUY" ? 9000 : 23.08}</p>
      </div>

      <div>
        <Button
          className={`cursor-pointer w-full py-6 text-white ${
            orderType === "SELL" ? "bg-red-600" : "bg-black"
          }`}
        >
          {orderType}
        </Button>

        <Button
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
          className="cursor-pointer mt-3 w-full py-4 bg-gray-200 text-black hover:bg-gray-300"
        >
          {orderType === "BUY" ? "Switch to SELL" : "Switch to BUY"}
        </Button>
      </div>
    </div>
  );
}

export default TradingForm
