import React from "react";
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
const Activity = () => {
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
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p>12-09-2023</p>
                  <p className="text-gray-400">04:23:45 PM</p>
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGIbDs9XnVLYl1uGN2BRE_Y24DF0JsUXgoA&s" />
                    <AvatarFallback>BTC</AvatarFallback>
                  </Avatar>
                  <span>Bitcoin</span>
                </TableCell>
                <TableCell>BTC</TableCell>
                <TableCell>1364881428323</TableCell>
                <TableCell>-0.20009</TableCell>
                <TableCell>$69249</TableCell>

                <TableCell className="text-right">345</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Activity;
