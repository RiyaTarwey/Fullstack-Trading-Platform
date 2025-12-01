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
import { getUserWatchlist, addItemToWatchlist } from "@/State/Watchlist/Action";
import { existInWatchlist } from "@/utils/ExistsinWatchlist";

const Watchlist = () => {
  const watchlist = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  const handleRemoveToWatchlist = (value) => {
    dispatch(
      addItemToWatchlist({ coinId: value, jwt: localStorage.getItem("jwt") })
    );
    console.log(value);
  };

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [dispatch]);

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
            {(watchlist?.items || []).map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.image} />
                    <AvatarFallback>{item.symbol}</AvatarFallback>
                  </Avatar>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{item.total_volume}</TableCell>
                <TableCell>{item.market_cap}</TableCell>
                <TableCell>{item.price_change_percentage_24h}</TableCell>
                <TableCell>${item.current_price}</TableCell>
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
