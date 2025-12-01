import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssetDetails } from "@/State/Asset/Action";
import { payOrder } from "@/State/Order/Action";
import { getWalletTransactions } from "@/State/Wallet/Action";
import { DotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TradingForm = () => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { coin, wallet, asset } = useSelector((store) => store);
  const dispatch = useDispatch();

  const price = coin?.coinDetails?.market_data?.current_price?.usd;

  const handleChange = (e) => {
    const amt = Number(e.target.value);
    setAmount(amt);

    if (!price) return;

    let qty = amt / price;
    setQuantity(qty > 0 ? qty : 0);
  };

  // ❗ BUY: Check insufficient wallet balance
  const insufficientBuy =
    orderType === "BUY" && amount > wallet?.userWallet?.balance;

  // ❗ SELL: Check insufficient sell quantity
  const insufficientSell =
    orderType === "SELL" && quantity > asset?.assetDetails?.quantity;

  const handleSubmitOrder = () => {
    if (insufficientBuy || insufficientSell) return;

    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(getWalletTransactions(localStorage.getItem("jwt")));
    dispatch(
      getAssetDetails({
        coinId: coin.coinDetails?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  return (
    <div className="space-y-10 p-5">
      {/* ===== AMOUNT INPUT + QUANTITY DISPLAY ===== */}
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
            <p className="border text-2xl flex justify-center w-36 h-14 rounded-md items-center">
              {quantity.toFixed(6)}
            </p>
          </div>
        </div>

        {/* ERROR MESSAGES */}
        {insufficientBuy && (
          <h1 className="text-red-600 text-center pt-4">
            Insufficient wallet balance
          </h1>
        )}

        {insufficientSell && (
          <h1 className="text-red-600 text-center pt-4">
            Insufficient asset quantity
          </h1>
        )}
      </div>

      {/* ===== COIN DETAILS DISPLAY ===== */}
      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage src={coin?.coinDetails?.image?.large} />
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <p>{coin?.coinDetails?.symbol?.toUpperCase()}</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{coin?.coinDetails?.name}</p>
          </div>

          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              ${coin?.coinDetails?.market_data?.current_price?.usd}
            </p>
            <p className="text-red-600">
              <span>
                {coin?.coinDetails?.market_data?.price_change_24h?.toFixed(2)}
              </span>
              <span>
                (
                {coin?.coinDetails?.market_data?.price_change_percentage_24h?.toFixed(
                  2
                )}
                %)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ===== ORDER TYPE & AVAILABLE INFO ===== */}
      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
        <p>
          {orderType === "BUY"
            ? `$${wallet?.userWallet?.balance ?? 0}`
            : asset?.assetDetails?.quantity ?? 0}
        </p>
      </div>

      {/* ===== BUTTONS ===== */}
      <div>
        <Button
          onClick={handleSubmitOrder}
          disabled={insufficientBuy || insufficientSell}
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
};

export default TradingForm;
