import React from "react";
import CustomerChart from "../HomeBody/CustomerChart";
import DeliveryChart from "../HomeBody/DeliveryChart";
import OrdersChart from "../HomeBody/OrdersChart";
import TotalSalesChart from "../HomeBody/TotalSalesChart";

const Chart = () => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 p-4 items-center justify-around gap-4">
      <div className="bg-whiteHigh rounded-xl p-8">
        <OrdersChart></OrdersChart>
      </div>
      <div className="bg-whiteHigh rounded-xl p-8">
        <TotalSalesChart></TotalSalesChart>
      </div>
      <div className="bg-whiteHigh rounded-xl p-8">
        <CustomerChart></CustomerChart>
      </div>
      <div className="bg-whiteHigh rounded-xl p-8">
        <DeliveryChart></DeliveryChart>
      </div>
    </section>
  );
};

export default Chart;
