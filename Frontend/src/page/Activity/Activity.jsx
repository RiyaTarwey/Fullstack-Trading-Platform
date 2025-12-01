import React, { useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "@/State/Order/Action";
import { calculateProfit } from "@/utils/CalculateProfit";
const Activity = () => {
  const dispatch=useDispatch()
  const {order}=useSelector(store=>store)


  useEffect(()=>{
    dispatch(getAllOrdersForUser({jwt:localStorage.getItem('jwt')}))
  },[])
  return (
    <div>
      <div className="p-5 lg:p-20">
        <h1 className="font-bold text-3xl pb-5">Activity</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] py-5">DATE & Time</TableHead>
              <TableHead>Trading Pair</TableHead>
              <TableHead>Buy Price</TableHead>
              <TableHead>Sell Price</TableHead>
              <TableHead>Order Type</TableHead>
              <TableHead>Profit / Loss</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {order.orders.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p>{new Date(item.timestamp).toLocaleDateString("en-GB")}</p>
                  <p className="text-gray-400">
                    {new Date(item.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.orderItem.coin.image} />
                    <AvatarFallback>BTC</AvatarFallback>
                  </Avatar>
                  <span>{item.orderItem.coin.name}</span>
                </TableCell>
                <TableCell>{item.orderItem.buyPrice}</TableCell>
                <TableCell>{item.orderItem.sellPrice}</TableCell>
                <TableCell>{item.orderType}</TableCell>
                <TableCell>{calculateProfit(item)}</TableCell>

                <TableCell className="text-right">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Activity;
