import React from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { DotIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

 const Home=() => {
  const [category, setCategory] = React.useState("all");

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  return (
    <div className="relative">
      <div className="lg:flex">
        <div className="lg:w-[50%] border-r">
          <div className="p-3 flex items-center gap-4">
            <Button
              variant={category === "all" ? "default" : "outline"}
              onClick={() => handleCategoryChange("all")}
              className="rounded-full cursor-pointer "
            >
              All
            </Button>

            <Button
              variant={category === "top50" ? "default" : "outline"}
              onClick={() => handleCategoryChange("top50")}
              className="rounded-full cursor-pointer"
            >
              Top 50
            </Button>

            <Button
              variant={category === "topGainers" ? "default" : "outline"}
              onClick={() => handleCategoryChange("topGainers")}
              className="rounded-full cursor-pointer"
            >
              Top Gainers
            </Button>

            <Button
              variant={category === "topLosers" ? "default" : "outline"}
              onClick={() => handleCategoryChange("topLosers")}
              className="rounded-full cursor-pointer"
            >
              Top Losers
            </Button>
          </div>

          <div>
            <AssetTable />
          </div>
        </div>

        <div className="hidden lg:block lg:w-[50%] p-5">
          <StockChart />

          <div className="flex gap-5 items-center">
            <div>
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://cryptologos.cc/logos/ethereum-eth-logo.png" />
                <AvatarFallback>ETH</AvatarFallback>
              </Avatar>
            </div>

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
}
export default Home;
