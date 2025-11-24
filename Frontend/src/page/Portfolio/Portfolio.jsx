import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/table";
import React from "react";
const Portfolio = () => {
  return (
    <div className="p-5 lg:p-20">
      <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Asset</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Change %</TableHead>
            <TableHead className="text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGIbDs9XnVLYl1uGN2BRE_Y24DF0JsUXgoA&s" />
                </Avatar>
                <span>Bitcoin</span>
              </TableCell>
              <TableCell>BTC</TableCell>
              <TableCell>9124463121</TableCell>
              <TableCell>1364881428323</TableCell>
              <TableCell>-0.20009</TableCell>
              <TableCell className="text-right">$69249</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
