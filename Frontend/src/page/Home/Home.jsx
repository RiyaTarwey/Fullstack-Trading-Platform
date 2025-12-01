import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { DotIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getCoinList, getTop50CoinList } from "@/State/Coin/Action";
import { useDispatch, useSelector } from "react-redux";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
  const [category, setCategory] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const dispatch = useDispatch();

  const coinList = useSelector((state) => state.coin?.coinList);
  const top50 = useSelector((state) => state.coin?.top50);

  // ------- Generate Top Gainers -------
  const topGainers = React.useMemo(() => {
    if (!coinList) return [];
    return [...coinList]
      .sort(
        (a, b) =>
          (b?.price_change_percentage_24h ?? 0) -
          (a?.price_change_percentage_24h ?? 0)
      )
      .slice(0, 50);
  }, [coinList]);

  // ------- Generate Top Losers -------
  const topLosers = React.useMemo(() => {
    if (!coinList) return [];
    return [...coinList]
      .sort(
        (a, b) =>
          (a?.price_change_percentage_24h ?? 0) -
          (b?.price_change_percentage_24h ?? 0)
      )
      .slice(0, 50);
  }, [coinList]);

  // ------- Determine table data -------
  const assetData = React.useMemo(() => {
    if (category === "all") return coinList;
    if (category === "top50") return top50;
    if (category === "topGainers") return topGainers;
    if (category === "topLosers") return topLosers;
    return [];
  }, [category, coinList, top50, topGainers, topLosers]);

  // ------- Fetch data for selected page -------
  useEffect(() => {
    dispatch(getCoinList(page));
  }, [dispatch, page]);

  // ------- Fetch top50 only when selected -------
  useEffect(() => {
    if (category === "top50") {
      dispatch(getTop50CoinList());
    }
  }, [category, dispatch]);

  // ------- Category Change -------
  const handleCategoryChange = (value) => {
    if (value !== category) setCategory(value);
  };

  // ------- Memoized Table -------
  const AssetTableElement = React.useMemo(
    () => <AssetTable coin={assetData} category={category} />,
    [assetData, category]
  );

  return (
    <div className="relative">
      <div className="lg:flex">
        {/* LEFT SIDE */}
        <div className="lg:w-[50%] border-r overflow-x-auto">
          {/* Category Buttons */}
          <div className="p-3 flex flex-wrap items-center gap-3">
            <Button
              variant={category === "all" ? "default" : "outline"}
              onClick={() => handleCategoryChange("all")}
              className="rounded-full"
            >
              All
            </Button>

            <Button
              variant={category === "top50" ? "default" : "outline"}
              onClick={() => handleCategoryChange("top50")}
              className="rounded-full"
            >
              Top 50
            </Button>

            <Button
              variant={category === "topGainers" ? "default" : "outline"}
              onClick={() => handleCategoryChange("topGainers")}
              className="rounded-full"
            >
              Top Gainers
            </Button>

            <Button
              variant={category === "topLosers" ? "default" : "outline"}
              onClick={() => handleCategoryChange("topLosers")}
              className="rounded-full"
            >
              Top Losers
            </Button>
          </div>

          {/* Table */}
          {AssetTableElement}

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => page > 1 && setPage(page - 1)}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink className="cursor-pointer">
                  {page}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() => setPage(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:block lg:w-[50%] p-5">
          {/* Chart */}
          <StockChart coinId={"ethereum"} />

          {/* ETH Info Static */}
          <div className="flex gap-5 items-center mt-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://cryptologos.cc/logos/ethereum-eth-logo.png" />
              <AvatarFallback>ETH</AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2">
                <p>ETH</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">Ethereum</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-red-600">
                  <span>-1319049822.578</span>
                  <span>(-0.29803%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
