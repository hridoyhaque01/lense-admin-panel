import React from "react";
import red from "../../Assets/round/red.png";
import blue from "../../Assets/round/blue.png";
import ChartArea from "../Charts/ChartArea";

const TotalSalesChart = () => {
  const data = [
    { name: "Feb", uv: 1700, pv: 1100, amt: 1800 },
    { name: "Mar", uv: 1400, pv: 1200, amt: 1300 },
    { name: "Apr", uv: 1600, pv: 1500, amt: 1200 },
    { name: "May", uv: 1300, pv: 1100, amt: 1900 },
    { name: "Jun", uv: 1300, pv: 1200, amt: 1400 },
    { name: "Jul", uv: 1500, pv: 1200, amt: 1900 },
    { name: "Aug", uv: 1300, pv: 1100, amt: 1700 },
    { name: "Sep", uv: 1300, pv: 1000, amt: 1100 },
    { name: "Oct", uv: 1400, pv: 1300, amt: 1500 },
    { name: "Nov", uv: 1700, pv: 1100, amt: 1700 },
    { name: "Dec", uv: 1500, pv: 1400, amt: 1100 },
    { name: "Jan", uv: 1900, pv: 1700, amt: 1500 },
  ];

  return (
    <div className="flex flex-col justify-between h-96">
      <section className="flex items-center justify-between">
        <p className="text-2xl text-blackMid pt-0.5 font-bold">Total Sales</p>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-ghost bordered border-1 border-blackMid text-blackMid rounded-full">
            Today
          </button>
          <button className="btn btn-sm btn-ghost bordered border-1 border-blackMid text-blackMid rounded-full">
            Weekly
          </button>
          <button className="btn btn-sm btn-ghost bordered border-1 bg-primaryMain text-whiteHigh rounded-full">
            Monthly
          </button>
          <button className="btn btn-sm btn-ghost bordered border-1 border-blackMid text-blackMid rounded-full">
            Yearly
          </button>
        </div>
      </section>
      <section className="flex items-center justify-start gap-6">
        <div className="flex items-center justify-center gap-2">
          <img src={red} alt="" />
          <p>This Year</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img src={blue} alt="" />
          <p>Last Year</p>
        </div>
      </section>
      <section>
        <ChartArea data={data}></ChartArea>
      </section>
    </div>
  );
};

export default TotalSalesChart;
