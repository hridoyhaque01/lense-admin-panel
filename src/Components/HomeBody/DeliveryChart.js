import React from "react";
import blue from "../../Assets/round/blue.png";
import red from "../../Assets/round/red.png";
import ChartBar from "../Charts/ChartBar";

const DeliveryChart = () => {
  const data = [
    { name: "2016", uv: 400, pv: 1100, amt: 1800 },
    { name: "2017", uv: 200, pv: 1400, amt: 1300 },
    { name: "2018", uv: 400, pv: 1500, amt: 1200 },
    { name: "2019", uv: 100, pv: 1100, amt: 1900 },
    { name: "2020", uv: 600, pv: 1200, amt: 1400 },
    { name: "2021", uv: 300, pv: 1200, amt: 1900 },
  ];

  return (
    <div className="flex flex-col justify-between h-96">
      <section className="flex items-center justify-between">
        <p className="text-2xl text-blackMid  font-bold">Delivery</p>
      </section>
      <section className="flex items-center justify-start gap-6 mb-6">
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
        <ChartBar data={data}></ChartBar>
      </section>
    </div>
  );
};

export default DeliveryChart;
