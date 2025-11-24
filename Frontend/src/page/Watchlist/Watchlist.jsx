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

const Watchlist = () => {
  const handleRemoveToWatchlist = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div className="p-5 lg:p-20">
        <h1 className="font-bold text-3xl pb-5">Watchlist</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] py-5">COIN</TableHead>
              <TableHead>SYMBOL</TableHead>
              <TableHead>VOLUME</TableHead>
              <TableHead>MARKET CAP</TableHead>
              <TableHead>24h</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right text-red-600">Remove</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGIbDs9XnVLYl1uGN2BRE_Y24DF0JsUXgoA&s" />
                    <AvatarFallback>BTC</AvatarFallback>
                  </Avatar>
                  <span>Bitcoin</span>
                </TableCell>

                <TableCell>BTC</TableCell>
                <TableCell>9124463121</TableCell>
                <TableCell>1364881428323</TableCell>
                <TableCell>-0.20009</TableCell>
                <TableCell>$69249</TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveToWatchlist(item.id)}
                    size="icon"
                    className="h-10 w-10 cursor-pointer"
                  >
                    <BookmarkFilledIcon className="w-6 h-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Watchlist;
