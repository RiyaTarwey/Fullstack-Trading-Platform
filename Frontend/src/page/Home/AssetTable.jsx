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
import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const AssetTable = React.memo(({ coin = [], category }) => {
  const navigate = useNavigate();

  const onRowClick = useCallback(
    (id) => () => {
      navigate(`/market/${id}`);
    },
    [navigate]
  );

  const rows = useMemo(() => {
    const list = Array.isArray(coin) ? coin : [];
    return list.map((item) => (
      <TableRow key={item.id}>
        <TableCell
          onClick={onRowClick(item.id)}
          className="font-medium flex items-center gap-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.image} />
            <AvatarFallback>
              {item.symbol?.slice(0, 3)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{item.name}</span>
        </TableCell>
        <TableCell>{item.symbol}</TableCell>
        <TableCell>{item.total_volume}</TableCell>
        <TableCell>{item.market_cap}</TableCell>
        <TableCell>{item.price_change_percentage_24h}</TableCell>
        <TableCell className="text-right">{item.current_price}</TableCell>
      </TableRow>
    ));
  }, [coin, onRowClick]);

  return (
    <Table>
      <ScrollArea className={`${category === "all" ? "h-[77vh]" : "[h-82vh]"}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">COIN</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24h</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </ScrollArea>
    </Table>
  );
});

export default AssetTable;
