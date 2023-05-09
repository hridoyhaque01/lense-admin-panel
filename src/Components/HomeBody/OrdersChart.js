import React from "react";
import HomeOrders from "../Tables/HomeOrders";

const OrdersChart = () => {
  return (
    <div className="flex flex-col h-96">
      <section className="flex items-center justify-between mb-6">
        <p className="text-2xl text-blackMid font-bold">Recent Lense Added</p>
      </section>
      <HomeOrders></HomeOrders>
    </div>
  );
};

export default OrdersChart;
