import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/ui/table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/State/Asset/Action";

const Portfolio = () => {
  const dispatch = useDispatch();
  const asset = useSelector((state) => state.asset); // select only slice

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(getUserAssets(jwt));
    else console.warn("no jwt found in localStorage");
  }, [dispatch]);

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
          {asset?.userAssets?.length ? (
            asset.userAssets.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={item.coin.image} />
                  </Avatar>
                  <span>{item.coin.name}</span>
                </TableCell>
                <TableCell>{item.coin.symbol?.toUpperCase()}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.coin.price_change_price_24h}</TableCell>
                <TableCell>{item.coin.price_change_percentage_24h}</TableCell>
                <TableCell className="text-right">
                  {item.coin.total_volume}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No assets to show
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
