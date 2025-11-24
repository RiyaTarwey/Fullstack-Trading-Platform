import { Button } from "@/components/ui/button";
import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";


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
];

const StockChart = () => {
    const[activeLable,setActiveLable]=useState("1 Day");
  const searies = [
    {
      data: [
        [1761073476508, 112036.997859396],
        [1761076903621, 112007.191816047],
        [1761080533036, 111054.586156555],
        [1761084048755, 110884.568149828],
        [1761087636945, 109054.766984171],
        [1761091307504, 108486.102627166],
        [1761094922979, 108176.853664936],
        [1761098491102, 108312.61477756],
        [1761102097144, 108351.052780279],
        [1761105656898, 108232.823941574],
        [1761109269087, 108647.44801249],
        [1761112911580, 108155.475771913],
        [1761116517581, 108032.844974467],
        [1761120121734, 108275.959144732],
        [1761123802444, 108283.315313473],
        [1761127310648, 108078.332995282],
        [1761130891203, 107750.274294659],
        [1761134443780, 107555.823644953],
        [1761138132442, 108107.16765802],
        [1761141714312, 108357.705321079],
        [1761145284048, 108333.139436694],
        [1761148881244, 108483.404851033],
        [1761152509707, 108424.779140899],
        [1761156367541, 107840.739774607],
        [1761159680604, 108023.061893014],
        [1761163291717, 108009.975719655],
        [1761166906788, 107576.47963571],
        [1761170531639, 107291.228388801],
        [1761174090671, 107087.572221835],
        [1761177677738, 107591.460509399],
        [1761181330552, 107929.705056838],
        [1761185194049, 108160.30780065],
        [1761188552190, 108262.866066835],
        [1761192111353, 108427.32244326],
        [1761195637318, 108715.746332969],
        [1761199288966, 108947.137243918],
        [1761202910973, 110161.633603218],
        [1761206467517, 109330.275124364],
        [1761210146339, 109495.837143223],
        [1761213701644, 109421.787832432],
        [1761217321857, 109478.100355425],
        [1761220929895, 109224.383321962],
        [1761224526860, 109094.584921442],
        [1761228027743, 109592.405620517],
        [1761231685576, 109628.742037369],
        [1761235316678, 110010.572520493],
        [1761238832266, 110228.23713486],
        [1761242506415, 111200.25221792],
        [1761246065225, 110608.176006087],
        [1761249654510, 110259.20500677],
        [1761253310700, 109894.826046195],
        [1761257168947, 109694.020333545],
        [1761260476719, 109976.562295182],
        [1761264092885, 110048.518272916],
        [1761267718300, 110590.881316359],
        [1761271403505, 110570.446960307],
        [1761274855853, 110676.860523151],
        [1761278529546, 110475.279274672],
        [1761282100101, 111294.444337238],
      ],
    },
  ];

  const options = {
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
  };
  const handleActiveLable=(value)=>{
    setActiveLable(value);
  }

  return (
    <div>
      <div className="space-x-3 mb-5 ">
        {timeSeries.map((item) => (
          <Button
            className="cursor-pointer"
            variant={activeLable === item.lable ? "default" : "outline"}
            onClick={() => handleActiveLable(item.lable)}
            key={item.lable}
          >
            {item.lable}
          </Button>
        ))}
      </div>
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={searies}
          height={450}
          type="area"
        />
      </div>
    </div>
  );
};

export default StockChart;
