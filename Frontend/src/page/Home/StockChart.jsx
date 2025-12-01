import { Button } from "@/components/ui/button";
import ReactApexChart from "react-apexcharts";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/State/Coin/Action";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3",
    key: "3 Month Time Series",
    lable: "3 Month",
    value: 90,
  },
  {
    keyword: "DIGITAL_CURRENCY_Yearly",
    key: "Yearly Time Series",
    lable: "1 Year",
    value: 365,
  },
];

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.coin);

  const [activeLable, setActiveLable] = useState(timeSeries[0]);

  // memoize series so chart doesn't re-render unnecessarily
  const series = useMemo(
    () => [
      {
        data: coin?.marketChart?.data ?? [],
      },
    ],
    [coin?.marketChart?.data]
  );

  // memoize options (static) to avoid recreating on every render
  const options = useMemo(
    () => ({
      chart: {
        id: "area-datatime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        tickAmount: 6,
      },
      colors: ["#FFA800"],
      markers: {
        colors: ["#FFA500"],
        strokeColors: "#000000",
        size: 0,
        strokeWidth: 1,
        style: "hollow",
      },
      tooltip: {
        theme: "dark",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      grid: {
        borderColor: "#e7e7e7",
        strokeDashArray: 4,
        show: true,
      },
    }),
    []
  );

  const handleActiveLable = useCallback(
    (value) => {
      if (value === activeLable) return;
      setActiveLable(value);
    },
    [activeLable]
  );

  useEffect(() => {
    dispatch(
      fetchMarketChart({
        coinId,
        days: activeLable.value,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [dispatch, coinId, activeLable.value]);

  return (
    <div>
      <div className="space-x-3 mb-5 ">
        {timeSeries.map((item) => (
          <Button
            className="cursor-pointer"
            variant={activeLable.lable === item.lable ? "default" : "outline"}
            onClick={() => handleActiveLable(item)}
            key={item.lable}
          >
            {item.lable}
          </Button>
        ))}
      </div>
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={series}
          height={450}
          type="area"
        />
      </div>
    </div>
  );
};

export default StockChart;
